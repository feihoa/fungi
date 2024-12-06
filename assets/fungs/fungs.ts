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
    "id": "6",
    "name": "Белый гриб",
    "description": "Съедобный гриб, широко используется в кулинарии.",
    "image": require("./images/Boletus_edulis.jpg"),
    "isEdible": 0
  },
  {
    "id": "52",
    "name": "Валуй",
    "description": "Условно-съедобный гриб с характерным запахом.",
    "image": require("./images/Russula_foetens.jpg"),
    "isEdible": 1
  },
  {
    "id": "47",
    "name": "Весёлка обыкновенная",
    "description": "Съедобен на ранней стадии, используется в народной медицине.",
    "image": require("./images/Phallus_impudicus.jpg"),
    "isEdible": 1
  },
  {
    "id": "48",
    "name": "Вешенка обыкновенная",
    "description": "Съедобный гриб, активно выращивается в промышленных масштабах.",
    "image": require("./images/Pleurotus_ostreatus.jpg"),
    "isEdible": 0
  },
  {
    "id": "27",
    "name": "Волнушка белая",
    "description": "Условно-съедобный гриб, требует предварительной обработки.",
    "image": require("./images/Lactarius_pubescens.jpg"),
    "isEdible": 1
  },
  {
    "id": "31",
    "name": "Волнушка розовая",
    "description": "Условно-съедобный гриб, используется в солении.",
    "image": require("./images/Lactarius_torminosus.jpg"),
    "isEdible": 1
  },
  {
    "id": "19",
    "name": "Гигрофор поздний",
    "description": "Съедобный гриб с нежной текстурой.",
    "image": require("./images/Hygrophorus_hypothejus.jpg"),
    "isEdible": 0
  },
  {
    "id": "22",
    "name": "Говорушка ворончатая",
    "description": "Условно-съедобный гриб, часто используется в засолке.",
    "image": require("./images/Infundibulicybe_Gibba.jpg"),
    "isEdible": 0
  },
  {
    "id": "39",
    "name": "Головач продолговатый",
    "description": "Съедобный гриб в молодом возрасте.",
    "image": require("./images/Lycoperdon_excipuliforme.jpg"),
    "isEdible": 0
  },
  {
    "id": "29",
    "name": "Горькушка",
    "description": "Условно-съедобный гриб, требует вымачивания.",
    "image": require("./images/Lactarius_rufus.jpg"),
    "isEdible": 1
  },
  {
    "id": "30",
    "name": "Груздь жёлтый",
    "description": "Съедобный гриб, особенно вкусен в солёном виде.",
    "image": require("./images/Lactarius_scrobiculatus.jpg"),
    "isEdible": 1
  },
  {
    "id": "28",
    "name": "Груздь настоящий",
    "description": "Съедобный гриб, высоко ценится в кулинарии.",
    "image": require("./images/Lactarius_resimus.jpg"),
    "isEdible": 1
  },
  {
    "id": "40",
    "name": "Дождевик съедобный",
    "description": "Съедобный гриб в молодом возрасте, с нежной мякотью.",
    "image": require("./images/Lycoperdon_perlatum.jpg"),
    "isEdible": 0
  },
  {
    "id": "54",
    "name": "Дубовик обыкновенный",
    "description": "Условно-съедобный гриб, требует термической обработки.",
    "image": require("./images/Suillellus_luridus.jpg"),
    "isEdible": 0
  },
  {
    "id": "57",
    "name": "Зеленушка",
    "description": "Съедобный гриб, но употребление в больших количествах может быть вредным.",
    "image": require("./images/Tricholoma_equestre.jpg"),
    "isEdible": 1
  },
  {
    "id": "41",
    "name": "Зонтик белый",
    "description": "Съедобный гриб с приятным вкусом.",
    "image": require("./images/Macrolepiota_excoriata.jpg"),
    "isEdible": 0
  },
  {
    "id": "55",
    "name": "Козляк",
    "description": "Съедобный гриб с мягкой текстурой.",
    "image": require("./images/Suillus_bovinus.jpg"),
    "isEdible": 0
  },
  {
    "id": "7",
    "name": "Лисичка настоящая",
    "description": "Съедобный гриб, высоко ценится за вкус и аромат.",
    "image": require("./images/Cantharellus_cibarius.jpg"),
    "isEdible": 0
  },
  {
    "id": "12",
    "name": "Колпак кольчатый",
    "description": "Съедобный гриб с нежным вкусом.",
    "image": require("./images/Cortinarius_caperatus.jpg"),
    "isEdible": 0
  },
  {
    "id": "56",
    "name": "Маслёнок настоящий",
    "description": "Съедобный гриб, популярный в кулинарии.",
    "image": require("./images/Suillus_luteus.jpg"),
    "isEdible": 0
  },
  {
    "id": "32",
    "name": "Млечник обыкновенный",
    "description": "Съедобный гриб, часто используется в засолке.",
    "image": require("./images/Lactarius_trivialis.jpg"),
    "isEdible": 1
  },
  {
    "id": "61",
    "name": "Моховик пестрый",
    "description": "Съедобный гриб, но с менее выраженным вкусом.",
    "image": require("./images/Xerocomellus_chrysenteron.jpg"),
    "isEdible": 0
  },
  {
    "id": "11",
    "name": "Навозник белый",
    "description": "Съедобный гриб в молодом возрасте, становится ядовитым в зрелости.",
    "image": require("./images/Coprinus_comatus.jpg"),
    "isEdible": 0
  },
  {
    "id": "42",
    "name": "Опёнок луговой",
    "description": "Съедобный гриб, популярный в кулинарии.",
    "image": require("./images/Marasmius_oreades.jpg"),
    "isEdible": 0
  },
  {
    "id": "5",
    "name": "Опёнок осенний",
    "description": "Съедобный гриб, часто встречается на старых деревьях.",
    "image": require("./images/Armillaria_mellea.jpg"),
    "isEdible": 0
  },
  {
    "id": "35",
    "name": "Подберезовик обыкновенный",
    "description": "Съедобный гриб, популярный в лесах.",
    "image": require("./images/Leccinum_scabrum.jpg"),
    "isEdible": 0
  },
  {
    "id": "51",
    "name": "Подгруздок белый",
    "description": "Съедобный гриб, часто используется для засолки.",
    "image": require("./images/Russula_delica.jpg"),
    "isEdible": 0
  },
  {
    "id": "34",
    "name": "Подосиновик красный",
    "description": "Съедобный гриб с ярким красным цветом.",
    "image": require("./images/Leccinum_aurantiacum.jpg"),
    "isEdible": 0
  },
  {
    "id": "62",
    "name": "Польский гриб",
    "description": "Съедобный гриб с хорошим вкусом.",
    "image": require("./images/Xerocomus_badius.jpg"),
    "isEdible": 0
  },
  {
    "id": "25",
    "name": "Рыжик настоящий",
    "description": "Съедобный гриб, высоко ценится в кулинарии.",
    "image": require("./images/Lactarius_deliciosus.jpg"),
    "isEdible": 0
  },
  {
    "id": "38",
    "name": "Рядовка лиловоногая",
    "description": "Съедобный гриб, часто используется в кулинарии.",
    "image": require("./images/Lepista_saeva.jpg"),
    "isEdible": 0
  },
  {
    "id": "58",
    "name": "Рядовка серая",
    "description": "Съедобный гриб с нежным вкусом.",
    "image": require("./images/Tricholoma_portentosum.jpg"),
    "isEdible": 0
  },
  {
    "id": "33",
    "name": "Скрипица",
    "description": "Условно-съедобный гриб, требует тщательной термической обработки.",
    "image": require("./images/Lactarius_vellereus.jpg"),
    "isEdible": 1
  },
  {
    "id": "60",
    "name": "Сморчковая шапочка богемская",
    "description": "Съедобный гриб, однако требует предварительной термической обработки.",
    "image": require("./images/Verpa_bohemica.jpg"),
    "isEdible": 0
  },
  {
    "id": "43",
    "name": "Сморчок настоящий",
    "description": "Съедобный гриб, высоко ценится за свой вкус.",
    "image": require("./images/Morchella_esculenta.jpg"),
    "isEdible": 0
  },
  {
    "id": "50",
    "name": "Сыроежка золотисто-красная",
    "description": "Съедобный гриб, часто используется в свежем виде.",
    "image": require("./images/Russula_aurea.jpg"),
    "isEdible": 0
  },
  {
    "id": "8",
    "name": "Трутовик чешуйчатый",
    "description": "Гриб, чаще используется в народной медицине.",
    "image": require("./images/Cerioporus_squamosus.jpg"),
    "isEdible": 1
  },
  {
    "id": "0",
    "name": "Шампиньон обыкновенный",
    "description": "Съедобный гриб, широко культивируется и используется в кулинарии.",
    "image": require("./images/Agaricus_campestris.jpg"),
    "isEdible": 0
  },
  {
    "id": "3",
    "name": "Бледная поганка",
    "description": "Ядовитый гриб, крайне опасен для человека.",
    "image": require("./images/Amanita_phalloides.jpg"),
    "isEdible": 2
  },
  {
    "id": "23",
    "name": "Волоконница патуйяра",
    "description": "Токсичный гриб, вызывает отравление при употреблении.",
    "image": require("./images/Inocybe_erubescens.jpg"),
    "isEdible": 2
  },
  {
    "id": "15",
    "name": "Галерина окаймленная",
    "description": "Ядовитый гриб, может вызывать серьезное отравление.",
    "image": require("./images/Galerina_marginata.jpg"),
    "isEdible": 2
  },
  {
    "id": "17",
    "name": "Гебелома клейкая",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Hebeloma_crustuliniforme.jpg"),
    "isEdible": 2
  },
  {
    "id": "45",
    "name": "Говорушка перевернутая",
    "description": "Несъедобный гриб, может вызвать расстройства пищеварения у некоторых людей.",
    "image": require("./images/Paralepista_flaccida.jpg"),
    "isEdible": 2
  },
  {
    "id": "24",
    "name": "Груздь золотисто-желтый",
    "description": "Несъедобный гриб, ценится за вкус и аромат.",
    "image": require("./images/Lactarius_chrysorrheus.jpg"),
    "isEdible": 2
  },
  {
    "id": "59",
    "name": "Желчный гриб",
    "description": "Несъедобный гриб с неприятным горьким вкусом.",
    "image": require("./images/Tylopilus_felleus.jpg"),
    "isEdible": 2
  },
  {
    "id": "36",
    "name": "Зонтик чешуйчатый",
    "description": "Несъедобный гриб.",
    "image": require("./images/Lepiota_brunneoincarnata.jpg"),
    "isEdible": 2
  },
  {
    "id": "37",
    "name": "Лепиота розоватая",
    "description": "Ядовитый гриб, вызывает серьезное отравление.",
    "image": require("./images/Lepiota_subincarnata.jpg"),
    "isEdible": 2
  },
  {
    "id": "18",
    "name": "Лисичка ложная",
    "description": "Несъедобный гриб, напоминающий съедобную лисичку, но вызывает расстройства.",
    "image": require("./images/Hygrophoropsis_aurantiaca.jpg"),
    "isEdible": 2
  },
  {
    "id": "53",
    "name": "Ложнодождевик обыкновенный",
    "description": "Ядовитый гриб, его употребление опасно для здоровья.",
    "image": require("./images/Scleroderma_citrinum.jpg"),
    "isEdible": 2
  },
  {
    "id": "20",
    "name": "Ложноопёнок серно-желтый",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Hypholoma_fasciculare.jpg"),
    "isEdible": 2
  },
  {
    "id": "44",
    "name": "Мицена чистая",
    "description": "Несъедобный гриб, вызывает легкие отравления.",
    "image": require("./images/Mycena_pura.jpg"),
    "isEdible": 2
  },
  {
    "id": "26",
    "name": "Млечник серо-розовый",
    "description": "Съедобный гриб, но может вызывать расстройства пищеварения.",
    "image": require("./images/Lactarius_helvus.jpg"),
    "isEdible": 1
  },
  {
    "id": "4",
    "name": "Мухомор вонючий",
    "description": "Ядовитый гриб, вызывает отравление и повреждение печени.",
    "image": require("./images/Amanita_virosa.jpg"),
    "isEdible": 2
  },
  {
    "id": "1",
    "name": "Мухомор красный",
    "description": "Ядовитый гриб, вызывает галлюцинации и отравления.",
    "image": require("./images/Amanita_muscaria.jpg"),
    "isEdible": 2
  },
  {
    "id": "2",
    "name": "Мухомор пантерный",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Amanita_pantherina.jpg"),
    "isEdible": 2
  },
  {
    "id": "10",
    "name": "Навозник серый",
    "description": "Съедобный гриб, но не рекомендуется употреблять с алкоголем.",
    "image": require("./images/Coprinopsis_atramentaria.jpg"),
    "isEdible": 1
  },
  {
    "id": "21",
    "name": "Ложноопёнок кирпично-красный",
    "description": "Съедобный гриб, но может вызывать расстройства при неправильной термической обработке.",
    "image": require("./images/Hypholoma_lateritium.jpg"),
    "isEdible": 1
  },
  {
    "id": "13",
    "name": "Паутинник кроваво-красный",
    "description": "Ядовитый гриб, вызывает отравление и повреждения печени.",
    "image": require("./images/Cortinarius_sanguineus.jpg"),
    "isEdible": 2
  },
  {
    "id": "9",
    "name": "Перечный гриб",
    "description": "Съедобный гриб с острым вкусом, используется в кулинарии.",
    "image": require("./images/Chalciporus_piperatus.jpg"),
    "isEdible": 1
  },
  {
    "id": "49",
    "name": "Сатанинский гриб",
    "description": "Ядовитый гриб, вызывает сильное отравление при употреблении.",
    "image": require("./images/Rubroboletus_satanas.jpg"),
    "isEdible": 2
  },
  {
    "id": "46",
    "name": "Свинушка тонкая",
    "description": "Ядовитый гриб, может вызвать отравление даже после термической обработки.",
    "image": require("./images/Paxillus_involutus.jpg"),
    "isEdible": 2
  },
  {
    "id": "16",
    "name": "Строчок обыкновенный",
    "description": "Ядовитый гриб, требует тщательной термической обработки для удаления токсинов.",
    "image": require("./images/Gyromitra_esculenta.jpg"),
    "isEdible": 2
  },
  {
    "id": "14",
    "name": "Энтолома щитоносная",
    "description": "Ядовитый гриб, вызывает отравление при употреблении.",
    "image": require("./images/Entoloma_cetratum.jpg"),
    "isEdible": 2
  },
]

export default fungi;
