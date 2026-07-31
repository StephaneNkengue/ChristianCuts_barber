import { localityPhrase } from "./business";

/**
 * Catalogue des prestations. Sert à la fois à la page /service, aux pages
 * détaillées /service/[slug], à la page /tarifs, au sitemap et au JSON-LD :
 * ajouter un service ici le fait apparaître partout, y compris dans le sitemap.
 *
 * Les prix proviennent de la page services d'origine. `priceValue` alimente
 * l'Offer schema.org ; il vaut `null` quand le prix n'est pas un montant fixe
 * (« à partir de », double tarif), auquel cas seul `priceLabel` est affiché.
 */

export type Service = {
  slug: string;
  /** Nom affiché, en casse normale. */
  name: string;
  /** Nom tel qu'affiché en majuscules sur la page /service d'origine. */
  displayName: string;
  priceLabel: string;
  priceValue: number | null;
  image: string;
  /** Texte alternatif de l'image : descriptif et localisé. */
  imageAlt: string;
  /** Accroche affichée sur le site (tuiles, listes, sous-titre de page). */
  summary: string;
  /**
   * Meta description de la page dédiée. Rédigée à la main pour tenir dans les
   * 140-160 caractères affichés par Google et finir sur un appel à l'action —
   * plutôt qu'une troncature automatique du résumé, qui coupait en plein mot.
   */
  metaDescription: string;
  /** Durée indicative, pour l'affichage et le JSON-LD. */
  duration: string | null;
  /** Corps de la page détaillée. */
  sections: { heading: string; body: string[] }[];
  /** Mis en avant sur la page d'accueil et dans les liens internes. */
  featured: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "coupe-classique",
    name: "Coupe classique",
    displayName: "COUPE CLASSIQUE",
    priceLabel: "40 $",
    priceValue: 40,
    image: "/galerie/gal13.jpg",
    imageAlt: `Coupe classique homme réalisée chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "La coupe homme de référence : longueur ajustée aux ciseaux et à la tondeuse, contours nets, finition adaptée à la forme du visage.",
    metaDescription: `Coupe homme ${localityPhrase()} : longueur aux ciseaux, dégradé à la tondeuse et contours nets. 40 $ chez Christian Cutz, sur rendez-vous. Réservez en ligne.`,
    duration: "PT45M",
    sections: [
      {
        heading: "En quoi consiste la coupe classique",
        body: [
          "La coupe classique couvre l'essentiel : on discute d'abord de la longueur souhaitée et de la façon dont tu te coiffes au quotidien, puis la coupe est travaillée à la tondeuse sur les côtés et aux ciseaux sur le dessus. Les contours — nuque, oreilles, ligne frontale — sont repris à la fin pour un rendu net.",
          "C'est la prestation adaptée si tu viens entretenir une coupe existante ou si tu veux un résultat sobre qui se recoiffe facilement le matin.",
        ],
      },
      {
        heading: "Dégradés et finitions",
        body: [
          "Dégradé bas, moyen ou haut, fondu progressif ou transition marquée : la hauteur du dégradé se décide ensemble avant de commencer, en fonction de la forme du crâne et de la densité des cheveux.",
          "Si tu hésites, le plus simple est d'apporter une photo de référence. Elle sert de point de départ, puis on ajuste à ta texture de cheveux.",
        ],
      },
      {
        heading: "Combien de temps prévoir",
        body: [
          "Compte environ 45 minutes. Pour un entretien de coupe récente, c'est souvent plus court ; pour un changement de style, mieux vaut prévoir une heure.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "coupe-et-barbe",
    name: "Coupe et barbe",
    displayName: "COUPE & BARBE",
    priceLabel: "50 $",
    priceValue: 50,
    image: "/galerie/gal10.jpg",
    imageAlt: `Coupe et taille de barbe réalisées chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Coupe complète et taille de barbe dans le même rendez-vous : contours dessinés, longueur égalisée, ligne de barbe alignée sur la coupe.",
    metaDescription: `Coupe et taille de barbe ${localityPhrase()} dans le même rendez-vous : contours dessinés, ligne de barbe fondue. 50 $ chez Christian Cutz. Réservez en ligne.`,
    duration: "PT1H",
    sections: [
      {
        heading: "Coupe et barbe dans le même rendez-vous",
        body: [
          "La formule combine la coupe classique et le travail de la barbe. L'intérêt de les faire ensemble est la cohérence : la ligne de barbe est dessinée en fonction du dégradé, et la transition entre les pattes et la barbe est fondue plutôt que coupée net.",
        ],
      },
      {
        heading: "Le travail de la barbe",
        body: [
          "La longueur est égalisée à la tondeuse selon le rendu voulu — barbe courte, barbe pleine, bouc. Les contours des joues et du cou sont ensuite repris pour délimiter proprement la barbe.",
          "Si tu laisses pousser, il est utile de venir régulièrement même sans changer la longueur : ce sont les contours qui font la différence entre une barbe entretenue et une barbe négligée.",
        ],
      },
      {
        heading: "À qui ça s'adresse",
        body: [
          "À toute personne qui porte la barbe et veut un rendu homogène avec sa coupe, plutôt que deux prestations traitées séparément. C'est la formule la plus demandée du salon.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "coiffure-et-lavage",
    name: "Coiffure et lavage",
    displayName: "COIFFURE & LAVAGE",
    priceLabel: "60 $",
    priceValue: 60,
    image: "/galerie/gal19.jpg",
    imageAlt: `Coiffure avec lavage réalisée chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Coupe précédée d'un shampooing complet : cheveux lavés et démêlés avant la coupe, pour une précision et une finition supérieures.",
    metaDescription: `Shampooing complet puis coupe ${localityPhrase()} : cheveux lavés et démêlés pour une finition plus précise. 60 $ chez Christian Cutz. Réservez votre créneau.`,
    duration: "PT1H",
    sections: [
      {
        heading: "Pourquoi laver avant de couper",
        body: [
          "Sur cheveux propres et humides, la coupe est plus précise : les longueurs tombent naturellement, les épis se repèrent tout de suite et le dégradé se fond mieux. Le lavage retire aussi les résidus de produits coiffants qui faussent l'appréciation de la longueur.",
        ],
      },
      {
        heading: "Le déroulement",
        body: [
          "Shampooing et massage du cuir chevelu, démêlage, puis la coupe. La mise en forme finale se fait sur cheveux séchés, avec le produit adapté à ta texture.",
          "C'est la formule à privilégier pour un événement, ou simplement quand tu veux repartir prêt plutôt que de devoir te recoiffer en rentrant.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "contour-unique",
    name: "Contour unique",
    displayName: "CONTOUR UNIQUE",
    priceLabel: "25 $",
    priceValue: 25,
    image: "/galerie/gal14.jpg",
    imageAlt: `Contour et soin de la barbe réalisés chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Reprise des contours seuls, sans toucher à la longueur : ligne frontale, nuque, oreilles et barbe redessinées entre deux coupes.",
    metaDescription: `Reprise des contours entre deux coupes ${localityPhrase()} : ligne frontale, nuque, oreilles et barbe redessinées. 25 $ chez Christian Cutz. Réservez en ligne.`,
    duration: "PT20M",
    sections: [
      {
        heading: "Le rattrapage entre deux coupes",
        body: [
          "Une coupe tient environ trois à quatre semaines, mais les contours, eux, se brouillent au bout d'une dizaine de jours. Le contour unique reprend uniquement ces lignes — front, tempes, nuque, tour d'oreilles — sans retoucher la longueur.",
          "C'est la prestation la plus rapide et la moins chère du salon, et celle qui prolonge le plus efficacement une coupe existante.",
        ],
      },
      {
        heading: "Contour et barbe",
        body: [
          "La reprise inclut aussi le soin de la barbe : ligne des joues et du cou redessinée pour garder un rendu net.",
        ],
      },
      {
        heading: "Quand venir",
        body: [
          "En pratique, une à deux semaines après ta coupe. Beaucoup de clients l'intercalent systématiquement entre deux coupes complètes.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "teinture",
    name: "Teinture",
    displayName: "TEINTURE",
    priceLabel: "Coloration 60 $ · Décoloration 100 $",
    priceValue: null,
    image: "/galerie/gal1.jpg",
    imageAlt: `Coloration de cheveux réalisée chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Coloration ou décoloration réalisée en salon : ton sur ton, changement de teinte ou éclaircissement, avec un rendu adapté à ta base.",
    metaDescription: `Coloration 60 $ ou décoloration 100 $ ${localityPhrase()}, adaptées à votre base de départ. Teinture réalisée en salon chez Christian Cutz. Réservez en ligne.`,
    duration: "PT1H30M",
    sections: [
      {
        heading: "Coloration et décoloration",
        body: [
          "Deux prestations distinctes. La coloration (60 $) dépose une teinte sur ta base naturelle : couvrir des cheveux blancs, foncer, ou poser un reflet. La décoloration (100 $) éclaircit d'abord la fibre avant d'appliquer la couleur — c'est l'étape obligatoire pour les teintes claires ou vives sur cheveux foncés.",
        ],
      },
      {
        heading: "Ce qu'il faut savoir avant",
        body: [
          "Le résultat dépend beaucoup de ta base de départ et de l'historique de tes cheveux. Un passage précédent en coloration change la façon dont la nouvelle teinte prend.",
          "Prévois plus de temps que pour une coupe : entre la pose et le temps de pause, une décoloration occupe facilement l'après-midi.",
        ],
      },
      {
        heading: "Entretien",
        body: [
          "Une couleur se ternit au lavage. Espacer les shampooings et utiliser un produit adapté aux cheveux colorés prolonge nettement la tenue.",
        ],
      },
    ],
    featured: false,
  },
  {
    slug: "nattes",
    name: "Nattes",
    displayName: "NATTES",
    priceLabel: "40 $",
    priceValue: 40,
    image: "/galerie/gal17.jpg",
    imageAlt: `Nattes réalisées chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Nattes réalisées sur mesure, motif et taille au choix : une coiffure protectrice qui tient plusieurs semaines.",
    metaDescription: `Nattes sur mesure ${localityPhrase()} : motif, épaisseur et taille au choix, pour une coiffure protectrice qui tient. 40 $ chez Christian Cutz. Réservez en ligne.`,
    duration: "PT1H30M",
    sections: [
      {
        heading: "Des nattes adaptées à ta texture",
        body: [
          "Le motif, l'épaisseur et le sens des tresses se décident avant de commencer. Nattes collées droites, motifs géométriques, tailles fines ou larges : le choix dépend autant du rendu voulu que de la longueur disponible.",
        ],
      },
      {
        heading: "Une coiffure protectrice",
        body: [
          "Au-delà de l'esthétique, les nattes limitent la manipulation quotidienne des cheveux et la casse qui va avec. C'est ce qui explique leur tenue sur plusieurs semaines avec un entretien minimal.",
        ],
      },
      {
        heading: "Préparer son rendez-vous",
        body: [
          "Viens avec les cheveux propres et démêlés : le temps de réalisation en dépend directement. Si tu ne peux pas les laver avant, prends la formule avec lavage.",
        ],
      },
    ],
    featured: false,
  },
  {
    slug: "twist",
    name: "Twist",
    displayName: "TWIST",
    priceLabel: "50 $",
    priceValue: 50,
    image: "/galerie/gal16.jpg",
    imageAlt: `Twists réalisés chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Twists réalisés mèche par mèche, pour une texture définie et un volume naturel qui tient dans la durée.",
    metaDescription: `Twists réalisés mèche par mèche ${localityPhrase()}, pour une texture définie et du volume naturel. 50 $ chez Christian Cutz. Réservez votre rendez-vous en ligne.`,
    duration: "PT1H30M",
    sections: [
      {
        heading: "Twists mèche par mèche",
        body: [
          "Chaque mèche est enroulée sur elle-même pour créer une torsade. Le résultat est plus souple que des nattes et met en valeur la texture naturelle du cheveu.",
        ],
      },
      {
        heading: "Taille et rendu",
        body: [
          "Des twists fins donnent un rendu défini et durent plus longtemps ; des twists plus larges donnent du volume et se réalisent plus vite. On choisit ensemble selon la longueur et la densité.",
        ],
      },
      {
        heading: "Faire durer",
        body: [
          "Protéger les cheveux la nuit — foulard ou bonnet en satin — évite les frisottis et prolonge sensiblement la tenue.",
        ],
      },
    ],
    featured: false,
  },
  {
    slug: "coiffure-et-teinture-permanente",
    name: "Coiffure et teinture permanente",
    displayName: "COIFFURE & TEINTURE PERMANENTE",
    priceLabel: "70 $",
    priceValue: 70,
    image: "/galerie/gal23.jpg",
    imageAlt: `Coiffure avec teinture permanente réalisée chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Coupe et teinture permanente dans le même rendez-vous : une couleur durable posée sur une coupe fraîchement travaillée.",
    metaDescription: `Coupe et teinture permanente ${localityPhrase()} dans le même rendez-vous : une couleur qui tient jusqu'à la repousse. 70 $ chez Christian Cutz. Réservez en ligne.`,
    duration: "PT2H",
    sections: [
      {
        heading: "Coupe et couleur permanente",
        body: [
          "La formule combine la coiffure et une teinture permanente. Contrairement à une coloration temporaire qui s'estompe au fil des lavages, la permanente pénètre la fibre et tient jusqu'à la repousse.",
        ],
      },
      {
        heading: "Pourquoi couper avant de teindre",
        body: [
          "Couper d'abord évite de teindre des longueurs qui vont partir, et permet d'ajuster la couleur au volume final de la coupe.",
        ],
      },
      {
        heading: "Suivi",
        body: [
          "La repousse devient visible au bout de quelques semaines selon ta vitesse de pousse et le contraste avec ta base. Une retouche des racines suffit alors, sans reprendre l'ensemble.",
        ],
      },
    ],
    featured: false,
  },
  {
    slug: "home-service",
    name: "Service à domicile",
    displayName: "HOME SERVICE",
    priceLabel: "À partir de 150 $",
    priceValue: null,
    image: "/galerie/gal18.jpg",
    imageAlt: `Service de barbier à domicile proposé par Christian Cutz ${localityPhrase()}`,
    summary:
      "Le barbier se déplace chez toi avec son matériel, à Montréal et dans les environs. Idéal pour un groupe ou un emploi du temps chargé.",
    metaDescription:
      "Barbier à domicile à Montréal, Laval et Longueuil : le matériel complet se déplace chez vous. À partir de 150 $ chez Christian Cutz. Réservez en ligne.",
    duration: null,
    sections: [
      {
        heading: "Le barbier se déplace",
        body: [
          "Le service à domicile amène le matériel complet chez toi. Il suffit d'un point d'eau et d'une prise électrique, ainsi que d'un espace dégagé pour installer le poste.",
          "La formule démarre à 150 $ et varie selon le nombre de personnes et la distance.",
        ],
      },
      {
        heading: "Dans quels cas",
        body: [
          "Pour une famille ou un groupe de colocataires qui font passer tout le monde d'un coup, pour une personne à mobilité réduite, ou avant un événement quand se déplacer n'est pas envisageable.",
        ],
      },
      {
        heading: "Secteur desservi",
        body: [
          "Montréal et les environs immédiats. Pour une adresse plus éloignée, contacte le salon avant de réserver afin de valider le déplacement.",
        ],
      },
    ],
    featured: false,
  },
  {
    slug: "coiffure-anniversaire",
    name: "Coiffure d'anniversaire",
    displayName: "COIFFURE D'ANNIVERSAIRE",
    priceLabel: "Gratuit",
    priceValue: 0,
    image: "/galerie/gal12.jpg",
    imageAlt: `Coiffure d'anniversaire offerte chez Christian Cutz, barbier ${localityPhrase()}`,
    summary:
      "Ta coupe est offerte le jour de ton anniversaire. Une pièce d'identité suffit, sur rendez-vous comme d'habitude.",
    metaDescription: `Votre coupe est offerte le jour de votre anniversaire chez Christian Cutz, barbier ${localityPhrase()}. Pièce d'identité demandée. Réservez votre créneau.`,
    duration: "PT45M",
    sections: [
      {
        heading: "Ta coupe offerte le jour de ton anniversaire",
        body: [
          "Le jour de ton anniversaire, la coiffure est offerte. Il suffit de présenter une pièce d'identité avec ta date de naissance en arrivant.",
        ],
      },
      {
        heading: "Comment en profiter",
        body: [
          "Réserve normalement, en ligne ou par téléphone, et signale-le en arrivant. Comme les créneaux partent vite, mieux vaut réserver quelques jours à l'avance plutôt que le matin même.",
        ],
      },
    ],
    featured: false,
  },
];

export const FEATURED_SERVICES = SERVICES.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
