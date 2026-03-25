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

const BIRD_IMAGE_OVERRIDES_BY_ID = {
  birds001:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Golab_miejski.jpg/960px-Golab_miejski.jpg",
  birds002:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Eurasian_magpie_%2810860%29.jpg/960px-Eurasian_magpie_%2810860%29.jpg",
  birds003:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Tree_Sparrow_August_2007_Osaka_Japan.jpg/960px-Tree_Sparrow_August_2007_Osaka_Japan.jpg",
  birds004:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Eurasian_hoopoe_by_Gunjan_Pandey.jpg/960px-Eurasian_hoopoe_by_Gunjan_Pandey.jpg",
  birds005:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg/960px-015_Wild_Golden_Eagle_in_flight_at_Pfyn-Finges_%28Switzerland%29_Photo_by_Giles_Laurent.jpg",
  birds006:
    "https://upload.wikimedia.org/wikipedia/commons/1/14/Bubo_bubo_3_%28Martin_Mecnarowski%29.jpg",
  birds007:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Cuckoo_%2851169010335%29.jpg/960px-Cuckoo_%2851169010335%29.jpg",
  birds008:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Single_Emperor_penguin.jpg/960px-Single_Emperor_penguin.jpg",
  birds009:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Struthio_Diversity.jpg/960px-Struthio_Diversity.jpg",
  birds010:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Broad-tailed_Hummingbird.jpg/960px-Broad-tailed_Hummingbird.jpg",
  birds011:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Larus_canus_Common_Gull_in_Norway.jpg/960px-Larus_canus_Common_Gull_in_Norway.jpg",
  birds012: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Blue-and-Yellow-Macaw.jpg",
  birds013:
    "https://upload.wikimedia.org/wikipedia/commons/f/f1/Little_egret_%28Egretta_garzetta%29_Photograph_by_Shantanu_Kuveskar.jpg",
  birds014:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/960px-006_Toco_toucan_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
  birds015:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/CygneVaires.jpg/960px-CygneVaires.jpg",
  birds016:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/017_Greater_flamingo_drinking_in_the_Camargue_Photo_by_Giles_Laurent.jpg/960px-017_Greater_flamingo_drinking_in_the_Camargue_Photo_by_Giles_Laurent.jpg",
  birds017:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Gallus_gallus_domesticus_-_Vogelpark_Steinen_03.jpg/960px-Gallus_gallus_domesticus_-_Vogelpark_Steinen_03.jpg",
  birds018:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/1_day_old_chick_hatchling_2.jpg/960px-1_day_old_chick_hatchling_2.jpg",
  birds019:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Mallard_2.jpg/960px-Mallard_2.jpg",
  birds020:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Greater_Spotted_Woodpecker_%2841554059345%29.jpg/960px-Greater_Spotted_Woodpecker_%2841554059345%29.jpg",
  birds021:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Greater_Spotted_Woodpecker_%2841554059345%29.jpg/960px-Greater_Spotted_Woodpecker_%2841554059345%29.jpg",
  birds022:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Greylag_Goose_-_St_James%27s_Park%2C_London_-_Nov_2006.jpg/960px-Greylag_Goose_-_St_James%27s_Park%2C_London_-_Nov_2006.jpg",
  birds023:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Peacock_on_tree_%2852077240794%29.jpg/960px-Peacock_on_tree_%2852077240794%29.jpg",
  birds024:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tyto_alba_1_Luc_Viatour.jpg/960px-Tyto_alba_1_Luc_Viatour.jpg",
  birds025:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Egret_display%2C_Florida%2C_US.jpg/960px-Great_Egret_display%2C_Florida%2C_US.jpg",
  birds026:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Haematopus_ostralegus_He.jpg/960px-Haematopus_ostralegus_He.jpg",
  birds027:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Alcedo_atthis_-England-8_%28cropped%29.jpg/960px-Alcedo_atthis_-England-8_%28cropped%29.jpg",
  birds028:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Falco_peregrinus_m_Humber_Bay_Park_Toronto.jpg/960px-Falco_peregrinus_m_Humber_Bay_Park_Toronto.jpg",
  birds029:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Great_white_pelican_%28Pelecanus_onocrotalus%29.jpg/960px-Great_white_pelican_%28Pelecanus_onocrotalus%29.jpg",
  birds030:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Diomedea_exulans_-_SE_Tasmania.jpg/960px-Diomedea_exulans_-_SE_Tasmania.jpg",
  birds031:
    "https://upload.wikimedia.org/wikipedia/commons/e/ee/Great_hornbill_Photograph_by_Shantanu_Kuveskar.jpg",
  birds032:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Skylark_2%2C_Lake_District%2C_England_-_June_2009.jpg/960px-Skylark_2%2C_Lake_District%2C_England_-_June_2009.jpg",
  birds033:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Rauchschwalbe_Hirundo_rustica.jpg/960px-Rauchschwalbe_Hirundo_rustica.jpg",
  birds034:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Mandarin_duck_%28Aix_galericulata%29.jpg/960px-Mandarin_duck_%28Aix_galericulata%29.jpg",
  birds035:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Eurasian_Curlew.jpg/960px-Eurasian_Curlew.jpg",
  birds036: "https://upload.wikimedia.org/wikipedia/commons/6/60/Fantail_Pigeon_%281518126605%29.jpg",
  birds037:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pygoscelis_Adeliae_20250105.jpg/960px-Pygoscelis_Adeliae_20250105.jpg",
  birds038:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Carrion_crow_2022_04_05_05_02.jpg/960px-Carrion_crow_2022_04_05_05_02.jpg",
  birds039: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Grus_japonensis_05.jpg",
  birds040:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lanius_bucephalus.JPG/960px-Lanius_bucephalus.JPG",
  birds041:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/The_brown-eared_bulbul_after_playing_with_water.jpg/960px-The_brown-eared_bulbul_after_playing_with_water.jpg",
  birds042:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Greater_white-fronted_goose_in_flight-1045.jpg/960px-Greater_white-fronted_goose_in_flight-1045.jpg",
  birds043:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Bommer_Weiher_-_Erpel_der_L%C3%B6ffelente.jpg/960px-Bommer_Weiher_-_Erpel_der_L%C3%B6ffelente.jpg",
  birds044:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Indian_cuckoo_%28Cuculus_micropterus%29_46.jpg/960px-Indian_cuckoo_%28Cuculus_micropterus%29_46.jpg",
  birds045:
    "https://upload.wikimedia.org/wikipedia/commons/a/a2/Male_Yellow-rumped_Flycatcher_%28Ficedula_zanthopygia%29_Korea_May_2012.jpg",
  birds046:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Varied_tit_at_Tenn%C5%8Dji_Park_in_Osaka%2C_January_2016.jpg/960px-Varied_tit_at_Tenn%C5%8Dji_Park_in_Osaka%2C_January_2016.jpg",
  birds047:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rigogolo-%28Oriolus_oriolus%29_Lazio%2C_isola_di_Ventotene_%28LT%29_19.4.2024_%28cropped%29.png/960px-Rigogolo-%28Oriolus_oriolus%29_Lazio%2C_isola_di_Ventotene_%28LT%29_19.4.2024_%28cropped%29.png",
  birds048:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Puffin_%28Fratercula_arctica%29.jpg/960px-Puffin_%28Fratercula_arctica%29.jpg",
  birds049:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Aegypius_monachus_-_2.jpg/960px-Aegypius_monachus_-_2.jpg",
  birds050:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Anas_zonorhyncha_swimming.jpg/960px-Anas_zonorhyncha_swimming.jpg",
  birds051:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/20180415_015_Winterswijk_Witte_kwikstaart_%2840785272624%29.jpg/960px-20180415_015_Winterswijk_Witte_kwikstaart_%2840785272624%29.jpg",
  birds052:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Zoothera_aurea%2C_Hong_Kong_1.jpg/960px-Zoothera_aurea%2C_Hong_Kong_1.jpg",
  birds053:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Great_tit_%28Parus_major%29%2C_Parc_du_Rouge-Cloitre%2C_For%C3%AAt_de_Soignes%2C_Brussels_%2826194636951%29.jpg/960px-Great_tit_%28Parus_major%29%2C_Parc_du_Rouge-Cloitre%2C_For%C3%AAt_de_Soignes%2C_Brussels_%2826194636951%29.jpg",
  birds054:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Black_faced_spoonbill_at_Niigata.JPG/960px-Black_faced_spoonbill_at_Niigata.JPG",
  birds055:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2021-05-05_Phalacrocorax_carbo_carbo%2C_Killingworth_Lake%2C_Northumberland_1-1.jpg/960px-2021-05-05_Phalacrocorax_carbo_carbo%2C_Killingworth_Lake%2C_Northumberland_1-1.jpg",
  birds056:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Male_lesser_spotted_woodpecker_%28Dryobates_minor%29.png/960px-Male_lesser_spotted_woodpecker_%28Dryobates_minor%29.png",
  birds057:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg/960px-Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg",
  birds058:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Common_kestrel_falco_tinnunculus.jpg/960px-Common_kestrel_falco_tinnunculus.jpg",
  birds059:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rigogolo-%28Oriolus_oriolus%29_Lazio%2C_isola_di_Ventotene_%28LT%29_19.4.2024_%28cropped%29.png/960px-Rigogolo-%28Oriolus_oriolus%29_Lazio%2C_isola_di_Ventotene_%28LT%29_19.4.2024_%28cropped%29.png",
  birds060:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cygnus_cygnus_Singschwan.jpg/960px-Cygnus_cygnus_Singschwan.jpg",
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

  const overrideImage =
    IMAGE_OVERRIDES_BY_ID[question.id] || BIRD_IMAGE_OVERRIDES_BY_ID[question.id];
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
