import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { isAuthenticated } from "@/app/lib/requireAuth";

const BUCKET = "coup-de-coeur";
const MAX_WIDTH = 1400; // largeur max des photos de la page

/**
 * POST : reçoit une image (multipart/form-data, champ "file"),
 * l'optimise si possible (redimension + WebP), l'envoie dans le bucket
 * Supabase "coup-de-coeur" et renvoie l'URL publique.
 *
 * L'optimisation utilise "sharp" s'il est disponible. Sinon, l'image
 * est envoyée telle quelle (repli automatique, aucune erreur).
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Le fichier doit être une image." }, { status: 400 });
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());

  // Tentative d'optimisation avec sharp (repli silencieux si indisponible).
  let outputBuffer: Buffer = inputBuffer;
  let extension = "jpg";
  let contentType = file.type;

  try {
    const sharpModule = await import("sharp");
    const sharp = sharpModule.default;
    outputBuffer = await sharp(inputBuffer)
      .rotate() // corrige l'orientation EXIF (photos de téléphone)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    extension = "webp";
    contentType = "image/webp";
  } catch (err) {
    console.error("SHARP ERROR:", err);
    // sharp indisponible : on garde l'image d'origine.
    const guessed = file.name.split(".").pop()?.toLowerCase();
    if (guessed) extension = guessed;
  }

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, outputBuffer, {
      contentType,
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName);

  return NextResponse.json({ url: data.publicUrl });
}
