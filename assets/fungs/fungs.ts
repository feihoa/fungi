export enum IsEdible {
  Edible,
  ConditionallyEdible,
  Toxic,
}

type FungusJson = {
  id: string;
  image: any;
  name: string;
  description: string;
  isEdible: IsEdible;
};

const fungi: FungusJson[] = [
  {
    "id": "Boletus_edulis",
    "name": "Белый гриб",
    "description": "Съедобный гриб, широко используется в кулинарии.",
    "image": require("./images/Boletus_edulis.jpg"),
    "isEdible": 0
  },
  {
    "id": "Russula_foetens",
    "name": "Валуй",
    "description": "Условно-съедобный гриб с характерным запахом.",
    "image": require("./images/Russula_foetens.jpg"),
    "isEdible": 1
  },
  {
    "id": "Phallus_impudicus",
    "name": "Весёлка обыкновенная",
    "description": "Съедобен на ранней стадии, используется в народной медицине.",
    "image": require("./images/Phallus_impudicus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Pleurotus_ostreatus",
    "name": "Вешенка обыкновенная",
    "description": "Съедобный гриб, активно выращивается в промышленных масштабах.",
    "image": require("./images/Pleurotus_ostreatus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lactarius_pubescens",
    "name": "Волнушка белая",
    "description": "Условно-съедобный гриб, требует предварительной обработки.",
    "image": require("./images/Lactarius_pubescens.jpg"),
    "isEdible": 1
  },
  {
    "id": "Lactarius_torminosus",
    "name": "Волнушка розовая",
    "description": "Условно-съедобный гриб, используется в солении.",
    "image": require("./images/Lactarius_torminosus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Hygrophorus_hypothejus",
    "name": "Гигрофор поздний",
    "description": "Съедобный гриб с нежной текстурой.",
    "image": require("./images/Hygrophorus_hypothejus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Infundibulicybe_Gibba",
    "name": "Говорушка ворончатая",
    "description": "Условно-съедобный гриб, часто используется в засолке.",
    "image": require("./images/Infundibulicybe_Gibba.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lycoperdon_excipuliforme",
    "name": "Головач продолговатый",
    "description": "Съедобный гриб в молодом возрасте.",
    "image": require("./images/Lycoperdon_excipuliforme.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lactarius_rufus",
    "name": "Горькушка",
    "description": "Условно-съедобный гриб, требует вымачивания.",
    "image": require("./images/Lactarius_rufus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Lactarius_scrobiculatus",
    "name": "Груздь жёлтый",
    "description": "Съедобный гриб, особенно вкусен в солёном виде.",
    "image": require("./images/Lactarius_scrobiculatus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Lactarius_resimus",
    "name": "Груздь настоящий",
    "description": "Съедобный гриб, высоко ценится в кулинарии.",
    "image": require("./images/Lactarius_resimus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Lycoperdon_perlatum",
    "name": "Дождевик съедобный",
    "description": "Съедобный гриб в молодом возрасте, с нежной мякотью.",
    "image": require("./images/Lycoperdon_perlatum.jpg"),
    "isEdible": 0
  },
  {
    "id": "Suillellus_luridus",
    "name": "Дубовик обыкновенный",
    "description": "Условно-съедобный гриб, требует термической обработки.",
    "image": require("./images/Suillellus_luridus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Tricholoma_equestre",
    "name": "Зеленушка",
    "description": "Съедобный гриб, но употребление в больших количествах может быть вредным.",
    "image": require("./images/Tricholoma_equestre.jpg"),
    "isEdible": 1
  },
  {
    "id": "Macrolepiota_excoriata",
    "name": "Зонтик белый",
    "description": "Съедобный гриб с приятным вкусом.",
    "image": require("./images/Macrolepiota_excoriata.jpg"),
    "isEdible": 0
  },
  {
    "id": "Suillus_bovinus",
    "name": "Козляк",
    "description": "Съедобный гриб с мягкой текстурой.",
    "image": require("./images/Suillus_bovinus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Cantharellus_cibarius",
    "name": "Лисичка настоящая",
    "description": "Съедобный гриб, высоко ценится за вкус и аромат.",
    "image": require("./images/Cantharellus_cibarius.jpg"),
    "isEdible": 0
  },
  {
    "id": "Cortinarius_caperatus",
    "name": "Колпак кольчатый",
    "description": "Съедобный гриб с нежным вкусом.",
    "image": require("./images/Cortinarius_caperatus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Suillus_luteus",
    "name": "Маслёнок настоящий",
    "description": "Съедобный гриб, популярный в кулинарии.",
    "image": require("./images/Suillus_luteus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lactarius_trivialis",
    "name": "Млечник обыкновенный",
    "description": "Съедобный гриб, часто используется в засолке.",
    "image": require("./images/Lactarius_trivialis.jpg"),
    "isEdible": 1
  },
  {
    "id": "Xerocomellus_chrysenteron",
    "name": "Моховик пестрый",
    "description": "Съедобный гриб, но с менее выраженным вкусом.",
    "image": require("./images/Xerocomellus_chrysenteron.jpg"),
    "isEdible": 0
  },
  {
    "id": "Coprinus_comatus",
    "name": "Навозник белый",
    "description": "Съедобный гриб в молодом возрасте, становится ядовитым в зрелости.",
    "image": require("./images/Coprinus_comatus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Marasmius_oreades",
    "name": "Опёнок луговой",
    "description": "Съедобный гриб, популярный в кулинарии.",
    "image": require("./images/Marasmius_oreades.jpg"),
    "isEdible": 0
  },
  {
    "id": "Armillaria_mellea",
    "name": "Опёнок осенний",
    "description": "Съедобный гриб, часто встречается на старых деревьях.",
    "image": require("./images/Armillaria_mellea.jpg"),
    "isEdible": 0
  },
  {
    "id": "Leccinum_scabrum",
    "name": "Подберезовик обыкновенный",
    "description": "Съедобный гриб, популярный в лесах.",
    "image": require("./images/Leccinum_scabrum.jpg"),
    "isEdible": 0
  },
  {
    "id": "Russula_delica",
    "name": "Подгруздок белый",
    "description": "Съедобный гриб, часто используется для засолки.",
    "image": require("./images/Russula_delica.jpg"),
    "isEdible": 0
  },
  {
    "id": "Leccinum_aurantiacum",
    "name": "Подосиновик красный",
    "description": "Съедобный гриб с ярким красным цветом.",
    "image": require("./images/Leccinum_aurantiacum.jpg"),
    "isEdible": 0
  },
  {
    "id": "Xerocomus_badius",
    "name": "Польский гриб",
    "description": "Съедобный гриб с хорошим вкусом.",
    "image": require("./images/Xerocomus_badius.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lactarius_deliciosus",
    "name": "Рыжик настоящий",
    "description": "Съедобный гриб, высоко ценится в кулинарии.",
    "image": require("./images/Lactarius_deliciosus.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lepista_saeva",
    "name": "Рядовка лиловоногая",
    "description": "Съедобный гриб, часто используется в кулинарии.",
    "image": require("./images/Lepista_saeva.jpg"),
    "isEdible": 0
  },
  {
    "id": "Tricholoma_portentosum",
    "name": "Рядовка серая",
    "description": "Съедобный гриб с нежным вкусом.",
    "image": require("./images/Tricholoma_portentosum.jpg"),
    "isEdible": 0
  },
  {
    "id": "Lactarius_vellereus",
    "name": "Скрипица",
    "description": "Условно-съедобный гриб, требует тщательной термической обработки.",
    "image": require("./images/Lactarius_vellereus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Verpa_bohemica",
    "name": "Сморчковая шапочка богемская",
    "description": "Съедобный гриб, однако требует предварительной термической обработки.",
    "image": require("./images/Verpa_bohemica.jpg"),
    "isEdible": 0
  },
  {
    "id": "Morchella_esculenta",
    "name": "Сморчок настоящий",
    "description": "Съедобный гриб, высоко ценится за свой вкус.",
    "image": require("./images/Morchella_esculenta.jpg"),
    "isEdible": 0
  },
  {
    "id": "Russula_aurea",
    "name": "Сыроежка золотисто-красная",
    "description": "Съедобный гриб, часто используется в свежем виде.",
    "image": require("./images/Russula_aurea.jpg"),
    "isEdible": 0
  },
  {
    "id": "Cerioporus_squamosus",
    "name": "Трутовик чешуйчатый",
    "description": "Гриб, чаще используется в народной медицине.",
    "image": require("./images/Cerioporus_squamosus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Agaricus_campestris",
    "name": "Шампиньон обыкновенный",
    "description": "Съедобный гриб, широко культивируется и используется в кулинарии.",
    "image": require("./images/Agaricus_campestris.jpg"),
    "isEdible": 0
  },
  {
    "id": "Amanita_phalloides",
    "name": "Бледная поганка",
    "description": "Ядовитый гриб, крайне опасен для человека.",
    "image": require("./images/Amanita_phalloides.jpg"),
    "isEdible": 2
  },
  {
    "id": "Inocybe_erubescens",
    "name": "Волоконница патуйяра",
    "description": "Токсичный гриб, вызывает отравление при употреблении.",
    "image": require("./images/Inocybe_erubescens.jpg"),
    "isEdible": 2
  },
  {
    "id": "Galerina_marginata",
    "name": "Галерина окаймленная",
    "description": "Ядовитый гриб, может вызывать серьезное отравление.",
    "image": require("./images/Galerina_marginata.jpg"),
    "isEdible": 2
  },
  {
    "id": "Hebeloma_crustuliniforme",
    "name": "Гебелома клейкая",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Hebeloma_crustuliniforme.jpg"),
    "isEdible": 2
  },
  {
    "id": "Paralepista_flaccida",
    "name": "Говорушка перевернутая",
    "description": "Несъедобный гриб, может вызвать расстройства пищеварения у некоторых людей.",
    "image": require("./images/Paralepista_flaccida.jpg"),
    "isEdible": 2
  },
  {
    "id": "Lactarius_chrysorrheus",
    "name": "Груздь золотисто-желтый",
    "description": "Несъедобный гриб, ценится за вкус и аромат.",
    "image": require("./images/Lactarius_chrysorrheus.jpg"),
    "isEdible": 2
  },
  {
    "id": "Tylopilus_felleus",
    "name": "Желчный гриб",
    "description": "Несъедобный гриб с неприятным горьким вкусом.",
    "image": require("./images/Tylopilus_felleus.jpg"),
    "isEdible": 2
  },
  {
    "id": "Lepiota_brunneoincarnata",
    "name": "Зонтик чешуйчатый",
    "description": "Несъедобный гриб.",
    "image": require("./images/Lepiota_brunneoincarnata.jpg"),
    "isEdible": 2
  },
  {
    "id": "Lepiota_subincarnata",
    "name": "Лепиота розоватая",
    "description": "Ядовитый гриб, вызывает серьезное отравление.",
    "image": require("./images/Lepiota_subincarnata.jpg"),
    "isEdible": 2
  },
  {
    "id": "Hygrophoropsis_aurantiaca",
    "name": "Лисичка ложная",
    "description": "Несъедобный гриб, напоминающий съедобную лисичку, но вызывает расстройства.",
    "image": require("./images/Hygrophoropsis_aurantiaca.jpg"),
    "isEdible": 2
  },
  {
    "id": "Scleroderma_citrinum",
    "name": "Ложнодождевик обыкновенный",
    "description": "Ядовитый гриб, его употребление опасно для здоровья.",
    "image": require("./images/Scleroderma_citrinum.jpg"),
    "isEdible": 2
  },
  {
    "id": "Hypholoma_fasciculare",
    "name": "Ложноопёнок серно-желтый",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Hypholoma_fasciculare.jpg"),
    "isEdible": 2
  },
  {
    "id": "Mycena_pura",
    "name": "Мицена чистая",
    "description": "Несъедобный гриб, вызывает легкие отравления.",
    "image": require("./images/Mycena_pura.jpg"),
    "isEdible": 2
  },
  {
    "id": "Lactarius_helvus",
    "name": "Млечник серо-розовый",
    "description": "Съедобный гриб, но может вызывать расстройства пищеварения.",
    "image": require("./images/Lactarius_helvus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Amanita_virosa",
    "name": "Мухомор вонючий",
    "description": "Ядовитый гриб, вызывает отравление и повреждение печени.",
    "image": require("./images/Amanita_virosa.jpg"),
    "isEdible": 2
  },
  {
    "id": "Amanita_muscaria",
    "name": "Мухомор красный",
    "description": "Ядовитый гриб, вызывает галлюцинации и отравления.",
    "image": require("./images/Amanita_muscaria.jpg"),
    "isEdible": 2
  },
  {
    "id": "Amanita_pantherina",
    "name": "Мухомор пантерный",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Amanita_pantherina.jpg"),
    "isEdible": 2
  },
  {
    "id": "Coprinopsis_atramentaria",
    "name": "Навозник серый",
    "description": "Съедобный гриб, но не рекомендуется употреблять с алкоголем.",
    "image": require("./images/Coprinopsis_atramentaria.jpg"),
    "isEdible": 1
  },
  {
    "id": "Hypholoma_lateritium",
    "name": "Ложноопёнок кирпично-красный",
    "description": "Съедобный гриб, но может вызывать расстройства при неправильной термической обработке.",
    "image": require("./images/Hypholoma_lateritium.jpg"),
    "isEdible": 1
  },
  {
    "id": "Cortinarius_sanguineus",
    "name": "Паутинник кроваво-красный",
    "description": "Ядовитый гриб, вызывает отравление и повреждения печени.",
    "image": require("./images/Cortinarius_sanguineus.jpg"),
    "isEdible": 2
  },
  {
    "id": "Chalciporus_piperatus",
    "name": "Перечный гриб",
    "description": "Съедобный гриб с острым вкусом, используется в кулинарии.",
    "image": require("./images/Chalciporus_piperatus.jpg"),
    "isEdible": 1
  },
  {
    "id": "Rubroboletus_satanas",
    "name": "Сатанинский гриб",
    "description": "Ядовитый гриб, вызывает сильное отравление при употреблении.",
    "image": require("./images/Rubroboletus_satanas.jpg"),
    "isEdible": 2
  },
  {
    "id": "Paxillus_involutus",
    "name": "Свинушка тонкая",
    "description": "Ядовитый гриб, может вызвать отравление даже после термической обработки.",
    "image": require("./images/Paxillus_involutus.jpg"),
    "isEdible": 2
  },
  {
    "id": "Gyromitra_esculenta",
    "name": "Строчок обыкновенный",
    "description": "Ядовитый гриб, требует тщательной термической обработки для удаления токсинов.",
    "image": require("./images/Gyromitra_esculenta.jpg"),
    "isEdible": 2
  },
  {
    "id": "Entoloma_cetratum",
    "name": "Энтолома щитоносная",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Entoloma_cetratum.jpg"),
    "isEdible": 2
  },
]

export default fungi;
