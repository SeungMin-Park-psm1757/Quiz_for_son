const manualImages = require("../../manual_images.json");
const crawledImages = require("../../crawled_images.json");

const KNOWN_BAD_IMAGE_PATTERN = /(Plato_and_Aristotle|dialectics)/i;

const IMAGE_OVERRIDES_BY_ID = {
  fish_marine044:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cucumaria_main.jpg/960px-Cucumaria_main.jpg",
  fish_marine045:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Paracentrotus_lividus_profil.JPG/960px-Paracentrotus_lividus_profil.JPG",
  fish_marine048:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Engraulis_japonicus_01.JPG/960px-Engraulis_japonicus_01.JPG",
  fish_marine049:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Atlantic_Cod%2C_Atlantischer_Kabeljau_%28Gadus_morhua%29.jpg/960px-Atlantic_Cod%2C_Atlantischer_Kabeljau_%28Gadus_morhua%29.jpg",
  fish_marine050:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Heteroconger_hassi_1.JPG?width=800",
  fish_marine062:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/HM_Orange_M_Sarawut.jpg/960px-HM_Orange_M_Sarawut.jpg",
  fish_marine063:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Salangichthys_microdon.jpg?width=800",
  fish_marine064:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Hyporhamphus_sajori.jpg/960px-Hyporhamphus_sajori.jpg",
  fish_marine066:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Philyra_pisum_mamekobusi01.jpg?width=800",
  fish_marine069:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Cangrejo_ermita%C3%B1o_%28Dardanus_calidus%29%2C_franja_marina_Teno-Rasca%2C_Tenerife%2C_Espa%C3%B1a%2C_2022-01-09%2C_DD_47.jpg/960px-Cangrejo_ermita%C3%B1o_%28Dardanus_calidus%29%2C_franja_marina_Teno-Rasca%2C_Tenerife%2C_Espa%C3%B1a%2C_2022-01-09%2C_DD_47.jpg",
  fish_marine072:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Emperor_Angelfish%2C_Western_form_-_Pomacanthus_imperator_1.jpg/960px-Emperor_Angelfish%2C_Western_form_-_Pomacanthus_imperator_1.jpg",
  fish_marine073:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Periophthalmus_modestus_by_OpenCage.jpg?width=800",
  fish_marine079:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Remora_remora.jpg/960px-Remora_remora.jpg",
  fish_marine085:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Penaeus_monodon.jpg/960px-Penaeus_monodon.jpg",
  fish_marine086:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Paralithodes_camtschaticus,_1.jpg?width=800",
  fish_marine087:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Octopus_minor_by_OpenCage.jpg/960px-Octopus_minor_by_OpenCage.jpg",
  fish_marine091:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Solen_strictus.jpg?width=800",
  fish_marine093:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Redseabreamji1.jpg/960px-Redseabreamji1.jpg",
  fish_marine096:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Sweetfish,_Plecoglossus_altivelis.jpg?width=800",
  fish_marine098:
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Opisthoproctus_soleatus.jpg",
  fish_marine099:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Psychrolutes_marcidus.jpg/960px-Psychrolutes_marcidus.jpg",
  animals006:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/960px-Grosser_Panda.JPG",
  animals019:
    "https://upload.wikimedia.org/wikipedia/commons/1/14/Bubo_bubo_3_%28Martin_Mecnarowski%29.jpg",
  animals034:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Peacock_on_tree_%2852077240794%29.jpg/960px-Peacock_on_tree_%2852077240794%29.jpg",
  animals039:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Talpa_europaea_MHNT.jpg/960px-Talpa_europaea_MHNT.jpg",
  animals041:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Greater_Spotted_Woodpecker_%2841554059345%29.jpg/960px-Greater_Spotted_Woodpecker_%2841554059345%29.jpg",
  animals055:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/South_American_tapir_%28Tapirus_terrestris%29.JPG/960px-South_American_tapir_%28Tapirus_terrestris%29.JPG",
  animals062:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/960px-Hausziege_04.jpg",
  animals063: "https://upload.wikimedia.org/wikipedia/commons/d/de/Nokota_Horses_cropped.jpg",
  animals066:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Blue_Wildebeest%2C_Ngorongoro.jpg/960px-Blue_Wildebeest%2C_Ngorongoro.jpg",
  animals067:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Jasper.Wapiti-Hirsch.P1033401.jpg/960px-Jasper.Wapiti-Hirsch.P1033401.jpg",
  animals068:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Fennec_Fox_Vulpes_zerda.jpg/960px-Fennec_Fox_Vulpes_zerda.jpg",
  animals079:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Wild_shortbeak_echidna.jpg/960px-Wild_shortbeak_echidna.jpg",
  animals089:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Leontopithecus_rosalia_-_Copenhagen_Zoo_-_DSC09082.JPG/960px-Leontopithecus_rosalia_-_Copenhagen_Zoo_-_DSC09082.JPG",
  animals094:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/960px-Irbis4.JPG",
  animals100:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Ursus_thibetanus_3_%28Wroclaw_zoo%29.JPG/960px-Ursus_thibetanus_3_%28Wroclaw_zoo%29.JPG",
  dinosaurs023:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kentrosaurus_aethiopicus.png?width=800",
  dinosaurs031:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/BYU_Utahraptor_skeletal_mount.jpg/960px-BYU_Utahraptor_skeletal_mount.jpg",
  dinosaurs052:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Orodromeus_skeleton.jpg/960px-Orodromeus_skeleton.jpg",
  dinosaurs054:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Euoplocephalus_TMP_1991.127.1.tif/lossy-page1-960px-Euoplocephalus_TMP_1991.127.1.tif.jpg",
  dinosaurs057:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anserimimus.jpg/960px-Anserimimus.jpg",
  insects009:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Photuris_lucicrescens.jpg/960px-Photuris_lucicrescens.jpg",
  insects016:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Rhithrogena_germanica_subimago_on_Equisetum_hyemale.jpg/960px-Rhithrogena_germanica_subimago_on_Equisetum_hyemale.jpg",
  insects018:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Common_house_fly%2C_Musca_domestica.jpg/960px-Common_house_fly%2C_Musca_domestica.jpg",
  insects021:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Indische_Stabschrecke_auf_einem_Himbeerblatt_im_Terrarium.jpg/960px-Indische_Stabschrecke_auf_einem_Himbeerblatt_im_Terrarium.jpg",
  insects022:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Antlion_larva.jpg?width=800",
  insects024:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Beetle_grub_(16739670363).jpg?width=800",
  insects029:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Caddisfly_Larva.jpg?width=800",
  insects030:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hoverfly_January_2008-6.jpg/960px-Hoverfly_January_2008-6.jpg",
  insects033:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Chenille_de_Grand_porte_queue_%28macaon%29.jpg/960px-Chenille_de_Grand_porte_queue_%28macaon%29.jpg",
  insects034: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Dendroctonus_ponderosae.jpg",
  insects040:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Hycleus_lugens,_Meloidae.jpg?width=800",
  insects041:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Photuris_lucicrescens.jpg/960px-Photuris_lucicrescens.jpg",
  insects043:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Caddisfly-larva.jpg?width=800",
  insects048:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Chrysopa_signata.jpg/960px-Chrysopa_signata.jpg",
  insects050:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cryptotympana_facialis1.jpg?width=800",
  insects052:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wax_Scale.jpg/960px-Wax_Scale.jpg",
  insects067:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Buprestidae_-_Sternocera_aequisignata-1.JPG/960px-Buprestidae_-_Sternocera_aequisignata-1.JPG",
  insects069:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mantis_Hymenopus_coronatus_6_Luc_Viatour.jpg/960px-Mantis_Hymenopus_coronatus_6_Luc_Viatour.jpg",
  insects070:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Palomena.prasina.jpg?width=800",
  insects071:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Rhithrogena_germanica_subimago_on_Equisetum_hyemale.jpg/960px-Rhithrogena_germanica_subimago_on_Equisetum_hyemale.jpg",
  insects076:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/The_Lone_Pollinator.jpg/960px-The_Lone_Pollinator.jpg",
  insects079:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Potter_wasp_20100722.jpg/960px-Potter_wasp_20100722.jpg",
  insects081: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Fesoj_-_Papilio_machaon_%28by%29.jpg",
  insects083:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tineola.bisselliella.7218.jpg/960px-Tineola.bisselliella.7218.jpg",
  insects085:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Araneae3.jpg/960px-Araneae3.jpg",
  insects086: "https://upload.wikimedia.org/wikipedia/commons/d/df/Wolf_spider_tunnel.jpg",
  insects087:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Brachypelma_vagans_p1.jpg/960px-Brachypelma_vagans_p1.jpg",
  insects088: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Scorpion_Photograph_By_Shantanu_Kuveskar.jpg",
  insects089:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Scolopendra_cingulata_-_D7-08-2291.JPG/960px-Scolopendra_cingulata_-_D7-08-2291.JPG",
  insects090:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Armadillidium_vulgare_male.jpg/960px-Armadillidium_vulgare_male.jpg",
  insects091:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Archispirostreptus-Gigas-Amphitheatre.jpg/960px-Archispirostreptus-Gigas-Amphitheatre.jpg",
  insects092:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Snail.jpg/960px-Snail.jpg",
  insects093:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Eisenia_foetida_R.H._%288%29.JPG/960px-Eisenia_foetida_R.H._%288%29.JPG",
  insects094:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Meat_eater_ant_feeding_on_honey02.jpg/500px-Meat_eater_ant_feeding_on_honey02.jpg",
  insects095:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg/960px-Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg",
  insects099:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Brown_hawker_dragonfly_(Aeshna_grandis)_dragonfly_nymph_late_instar.JPG?width=800",
  insects100:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cicada_-_Neotibicen_linnei%2C_Woodbridge%2C_Virginia.jpg/960px-Cicada_-_Neotibicen_linnei%2C_Woodbridge%2C_Virginia.jpg",
};

const FALLBACK_COPY = {
  fish_marine: {
    emoji: "🐠",
    title: "바닷속 힌트 카드",
    subtitle: "어떤 친구인지 떠올려 보세요",
  },
  animals: {
    emoji: "🦁",
    title: "동물 힌트 카드",
    subtitle: "설명을 읽고 모습을 상상해 보세요",
  },
  dinosaurs: {
    emoji: "🦖",
    title: "공룡 힌트 카드",
    subtitle: "길어도 천천히 읽으며 맞혀 보세요",
  },
  insects: {
    emoji: "🦋",
    title: "곤충 힌트 카드",
    subtitle: "작은 특징을 잘 살펴보면 맞힐 수 있어요",
  },
  birds: {
    emoji: "🐦",
    title: "새 친구 힌트 카드",
    subtitle: "깃털과 부리 모습을 떠올려 보세요",
  },
};

const isUsableImageUrl = (imageUrl) =>
  Boolean(imageUrl) && !KNOWN_BAD_IMAGE_PATTERN.test(imageUrl);

export const resolveQuizImageUri = (question) => {
  if (!question) {
    return null;
  }

  const overrideImage = IMAGE_OVERRIDES_BY_ID[question.id];
  if (overrideImage) {
    return overrideImage;
  }

  if (isUsableImageUrl(question.imageUrl)) {
    return question.imageUrl;
  }

  return crawledImages[question.answer] || manualImages[question.answer] || null;
};

export const getQuizFallbackCopy = (category) =>
  FALLBACK_COPY[category] || {
    emoji: "🌟",
    title: "퀴즈 힌트 카드",
    subtitle: "설명을 천천히 읽고 맞혀 보세요",
  };
