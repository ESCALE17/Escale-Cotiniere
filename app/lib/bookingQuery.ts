export type BookingQueryState = {
  villa?: string;
  arrival?: string;
  departure?: string;
  adults?: number | string;
  children?: number | string;
  babies?: number | string;
  pet?: string;
  lang?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  telephoneFixe?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
};

/**
 * Construit une chaîne de paramètres d'URL à partir de l'état de la
 * réservation. Utilisé pour transmettre les informations d'une page du
 * tunnel à la suivante (aucune base de données n'est utilisée : tout
 * transite via l'URL).
 */
export function buildBookingQuery(state: BookingQueryState): string {
  const params = new URLSearchParams();

  Object.entries(state).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

/**
 * Lit l'état de réservation depuis un objet URLSearchParams (Next.js
 * useSearchParams()) et renvoie des valeurs déjà typées/nettoyées.
 */
export function readBookingQuery(searchParams: URLSearchParams): Required<
  Pick<
    BookingQueryState,
    "villa" | "arrival" | "departure" | "pet"
  >
> & {
  adults: number;
  children: number;
  babies: number;
  lang: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  telephoneFixe: string;
  adresse: string;
  codePostal: string;
  ville: string;
  pays: string;
} {
  return {
    villa: searchParams.get("villa") ?? "",
    arrival: searchParams.get("arrival") ?? "",
    departure: searchParams.get("departure") ?? "",
    adults: Number(searchParams.get("adults") ?? 2),
    children: Number(searchParams.get("children") ?? 0),
    babies: Number(searchParams.get("babies") ?? 0),
    pet: searchParams.get("pet") ?? "non",
    lang: searchParams.get("lang") ?? "fr",
    nom: searchParams.get("nom") ?? "",
    prenom: searchParams.get("prenom") ?? "",
    email: searchParams.get("email") ?? "",
    telephone: searchParams.get("telephone") ?? "",
    telephoneFixe: searchParams.get("telephoneFixe") ?? "",
    adresse: searchParams.get("adresse") ?? "",
    codePostal: searchParams.get("codePostal") ?? "",
    ville: searchParams.get("ville") ?? "",
    pays: searchParams.get("pays") ?? "",
  };
}
