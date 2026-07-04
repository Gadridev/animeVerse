export const CHARACTERS = [
  { id: 1, name: "Levi Ackerman", role: "Principal", animeId: 1, bio: "Soldat d'élite au sang-froid redoutable, considéré comme le combattant le plus fort de l'humanité." },
  { id: 2, name: "L", role: "Principal", animeId: 2, bio: "Détective mystérieux au raisonnement hors norme, déterminé à démasquer Kira." },
  { id: 3, name: "Monkey D. Luffy", role: "Principal", animeId: 3, bio: "Capitaine optimiste et increvable, prêt à tout pour devenir le roi des pirates." },
  { id: 4, name: "Frieren", role: "Principal", animeId: 4, bio: "Mage elfe immortelle qui redécouvre, siècle après siècle, la valeur du temps partagé." },
  { id: 5, name: "Gojo Satoru", role: "Secondaire", animeId: 5, bio: "Sorcier le plus puissant de son époque, professeur charismatique et provocateur." },
  { id: 6, name: "Tanjiro Kamado", role: "Principal", animeId: 6, bio: "Jeune vendeur de charbon devenu pourfendeur, animé par une compassion sans faille." },
  { id: 7, name: "Edward Elric", role: "Principal", animeId: 7, bio: "Jeune alchimiste prodige au bras et à la jambe automail, en quête de rédemption." },
  { id: 8, name: "Anya Forger", role: "Secondaire", animeId: 8, bio: "Fillette télépathe qui tente tant bien que mal de garder les secrets de sa famille improvisée." },
  { id: 9, name: "Denji", role: "Principal", animeId: 9, bio: "Jeune homme pauvre devenu hybride homme-démon, rêvant d'une vie simple et heureuse." },
  { id: 10, name: "Thorfinn", role: "Principal", animeId: 10, bio: "Guerrier viking rongé par la vengeance, en quête d'un sens à donner à sa violence." },
  { id: 11, name: "Izuku Midoriya", role: "Principal", animeId: 11, bio: "Adolescent sans pouvoir qui hérite d'une force légendaire et s'entraîne pour la maîtriser." },
  { id: 12, name: "Okabe Rintarou", role: "Principal", animeId: 12, bio: "Savant fou autoproclamé, narrateur halluciné d'une expérience qui dérape." },
];

export const CHARACTER_HUES = ["#E8432E", "#D6A34C", "#3E8E7E", "#4A5AA8", "#7A4A8A"];

export const getCharacterById = (id) => CHARACTERS.find((c) => c.id === Number(id));

export const getCharactersByAnimeId = (animeId) =>
  CHARACTERS.filter((c) => c.animeId === Number(animeId));

export const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
