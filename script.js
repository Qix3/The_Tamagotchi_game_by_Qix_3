// ========== ДАННЫЕ ПИТОМЦЕВ ==========
const PETS = {
    forest: [
        { id: 'redtail',   name: 'Рыжехвост', emoji: '🦊', type: 'Лисёнок' },
        { id: 'velvet',    name: 'Бархатун',  emoji: '🦡', type: 'Барсучок' },
        { id: 'rustle',    name: 'Шуршун',    emoji: '🦔', type: 'Ёжик' },
    ],
    desert: [
        { id: 'sandrunner', name: 'Пескобег',  emoji: '🐹', type: 'Тушканчик' },
        { id: 'spiny',      name: 'Колючий Странник', emoji: '🦎', type: 'Игуана' },
        { id: 'dune',       name: 'Барханник', emoji: '🦊', type: 'Фенёк' },
    ],
    aquatic: [
        { id: 'pearlfin',   name: 'Жемчужный Плавник', emoji: '🐟', type: 'Рыбка' },
        { id: 'shellback',  name: 'Панцирёк', emoji: '🐢', type: 'Черепашка' },
        { id: 'clawlet',    name: 'Клешнёнок', emoji: '🦀', type: 'Краб' },
    ],
    frozen: [
        { id: 'snowpuff',   name: 'Снежок-Пушок', emoji: '🦊', type: 'Песец' },
        { id: 'icelet',     name: 'Ледышка', emoji: '🐧', type: 'Пингвинёнок' },
        { id: 'frostmoth',  name: 'Морозный Мотылёк', emoji: '🦋', type: 'Бабочка' },
    ],
    volcanic: [
        { id: 'ember',      name: 'Уголёк', emoji: '🦎', type: 'Саламандра' },
        { id: 'ashwing',    name: 'Пепельный Крылан', emoji: '🦇', type: 'Летучая мышь' },
        { id: 'magmabeetle',name: 'Магмовый Жучок', emoji: '🐞', type: 'Жук' },
    ],
};

// ========== КОНСТАНТЫ ==========
const STAGES = {
    baby:  { name: 'Детёныш',  minAge: 0, spriteScale: 0.7, emojiSuffix: '👶', unlockWork: false },
    teen:  { name: 'Подросток', minAge: 3, spriteScale: 0.9, emojiSuffix: '🧒', unlockWork: false },
    adult: { name: 'Взрослый',  minAge: 7, spriteScale: 1.1, emojiSuffix: '🧑', unlockWork: true },
};

const DAY_MS = 60000;
const WEEK_MS = 14 * 24 * 60 * 60 * 1000;
const SEASON_EVENT_DURATION = 2 * 60 * 60 * 1000;
const EVENT_COOLDOWN = 3 * 60 * 60 * 1000;
const PASSIVE_DECAY = { hunger: 2, energy: 1.5, mood: 1 };
const INCOME_RATE = 5;
const WALK_INCOME_BONUS = 20;
const WALK_DURATION = 5 * 60 * 1000;
const WORK_DURATION = 30 * 60 * 1000;
const WORK_REWARD = 30;
const ACTION_COOLDOWN = 500;
const COOK_DURATION = 10000;
const COOKABLE_FOOD = ['meat', 'fish', 'mushroom', 'berries', 'nectar'];
const HUNGER_STRIKE_DAYS_FOR_DAMAGE = 3;
const HUNGER_STRIKE_DAYS_FOR_RUNAWAY = 1;
const RUNAWAY_CHANCE_BASE = 0.02;
const RUNAWAY_CHANCE_MAX = 0.30;
const RUNAWAY_WEATHER_MODIFIER = 0.4;
const RUNAWAY_AGE_BONUS = 7;
const SEARCH_DURATION = 15000;
const SEARCH_SUCCESS_CHANCE = 0.40;
const AFFECTION_MAX_PENALTY = 0.5;
const SHELVES_BY_STAGE = { baby: 2, teen: 4, adult: 6 };
const HOME_DURABILITY_MAX = 100;
const HOME_BASE_DAMAGE_RATE = 0.05;
const HOME_DAMAGE_RATE_MULTIPLIER = { winter: 1.5, summer: 1.2, autumn: 1.0, spring: 0.8 };
const HOME_DAMAGE_EVENT_MULTIPLIER = { 'Ливень': 2.0, 'Метель': 2.5, 'Засуха': 1.5, 'Похолодание': 1.8 };
const HOME_DAMAGE_AQUATIC_MULTIPLIER = 2.5;
const HOME_REPAIR_COST_PER_POINT = 1;
const NEIGHBOR_VISIT_INTERVAL = 3 * 60 * 1000;
const NEIGHBOR_VISIT_CHANCE = 0.15;
const FRESHNESS_DECAY_BASE = 0.5;
const FRESHNESS_DECAY_WINTER = 0.25;
const FRESHNESS_DECAY_SUMMER = 0.75;
const FRESHNESS_DECAY_HOT_MULTIPLIER = 1.5;

const SEASONS = {
    spring: { name: 'Весна', emoji: '🌸', bgOverlay: 'linear-gradient(180deg, rgba(144,238,144,0.2), rgba(34,139,34,0.1))', passiveMod: { mood: 0.3 } },
    summer: { name: 'Лето', emoji: '☀️', bgOverlay: 'linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,140,0,0.1))', passiveMod: { energy: 0.3 } },
    autumn: { name: 'Осень', emoji: '🍂', bgOverlay: 'linear-gradient(180deg, rgba(210,105,30,0.2), rgba(139,69,19,0.1))', passiveMod: { hunger: -0.5 } },
    winter: { name: 'Зима', emoji: '❄️', bgOverlay: 'linear-gradient(180deg, rgba(200,230,255,0.3), rgba(176,196,222,0.2))', passiveMod: { energy: -0.5 } },
};

const SEASON_EVENTS = [
    { name: 'Засуха', emoji: '🏜', seasons: ['summer'], effect: { hunger: -0.3, mood: -0.2 }, duration: SEASON_EVENT_DURATION, desc: 'Жаркая засуха! Голод и настроение снижаются быстрее.' },
    { name: 'Похолодание', emoji: '🥶', seasons: ['autumn','winter'], effect: { energy: -0.4, health: -0.1 }, duration: SEASON_EVENT_DURATION, desc: 'Резкое похолодание! Энергия падает быстрее.' },
    { name: 'Цветение', emoji: '🌺', seasons: ['spring'], effect: { mood: 0.4, health: 0.1 }, duration: SEASON_EVENT_DURATION, desc: 'Всё цветёт! Настроение и здоровье растут.' },
    { name: 'Ливень', emoji: '🌧', seasons: ['spring','autumn'], effect: { mood: -0.3, energy: -0.2 }, duration: SEASON_EVENT_DURATION, desc: 'Проливной дождь! Настроение и энергия снижаются.' },
    { name: 'Солнечный день', emoji: '🌤', seasons: ['spring','summer'], effect: { mood: 0.3, energy: 0.2 }, duration: SEASON_EVENT_DURATION, desc: 'Прекрасная погода! Настроение и энергия растут.' },
    { name: 'Метель', emoji: '🌨', seasons: ['winter'], effect: { energy: -0.5, hunger: -0.3 }, duration: SEASON_EVENT_DURATION, desc: 'Сильная метель! Энергия и голод снижаются быстрее.' },
];

const LOOT_TABLES = {
    forest: [
        { id: 'mushroom', name: 'Гриб', emoji: '🍄', weight: 30, rarity: 'common', type: 'loot' },
        { id: 'branch', name: 'Ветка', emoji: '🪵', weight: 25, rarity: 'common', type: 'loot' },
        { id: 'flower', name: 'Цветок', emoji: '🌸', weight: 20, rarity: 'uncommon', type: 'both' },
        { id: 'honey', name: 'Мёд', emoji: '🍯', weight: 15, rarity: 'rare', type: 'loot' },
        { id: 'forest_crystal', name: 'Лесной кристалл', emoji: '💎', weight: 10, rarity: 'epic', type: 'decor' },
    ],
    desert: [
        { id: 'sandstone', name: 'Песчаник', emoji: '🪨', weight: 30, rarity: 'common', type: 'loot' },
        { id: 'cactus', name: 'Кактус', emoji: '🌵', weight: 25, rarity: 'common', type: 'both' },
        { id: 'bone', name: 'Кость', emoji: '💀', weight: 20, rarity: 'uncommon', type: 'loot' },
        { id: 'desert_amulet', name: 'Пустынный амулет', emoji: '🔮', weight: 15, rarity: 'rare', type: 'decor' },
        { id: 'gold_scorpion', name: 'Золотой скорпион', emoji: '✨', weight: 10, rarity: 'epic', type: 'both' },
    ],
    aquatic: [
        { id: 'shell', name: 'Ракушка', emoji: '🐚', weight: 30, rarity: 'common', type: 'both' },
        { id: 'coral', name: 'Коралл', emoji: '🪸', weight: 25, rarity: 'common', type: 'decor' },
        { id: 'pearl', name: 'Жемчужина', emoji: '🫧', weight: 20, rarity: 'uncommon', type: 'loot' },
        { id: 'rare_fish', name: 'Редкая рыба', emoji: '🐟', weight: 15, rarity: 'rare', type: 'loot' },
        { id: 'sea_sapphire', name: 'Морской сапфир', emoji: '💠', weight: 10, rarity: 'epic', type: 'decor' },
    ],
    frozen: [
        { id: 'snowflake', name: 'Снежинка', emoji: '❄️', weight: 30, rarity: 'common', type: 'decor' },
        { id: 'ice_shard', name: 'Ледяной осколок', emoji: '🪨', weight: 25, rarity: 'common', type: 'loot' },
        { id: 'candy', name: 'Леденец', emoji: '🍬', weight: 20, rarity: 'uncommon', type: 'loot' },
        { id: 'eternal_ice', name: 'Вечный лёд', emoji: '🧊', weight: 15, rarity: 'rare', type: 'decor' },
        { id: 'ice_diamond', name: 'Ледяной алмаз', emoji: '💎', weight: 10, rarity: 'epic', type: 'both' },
    ],
    volcanic: [
        { id: 'obsidian', name: 'Обсидиан', emoji: '🪨', weight: 30, rarity: 'common', type: 'loot' },
        { id: 'ash', name: 'Пепел', emoji: '🌋', weight: 25, rarity: 'common', type: 'loot' },
        { id: 'fire_flower', name: 'Огненный цветок', emoji: '🔥', weight: 20, rarity: 'uncommon', type: 'both' },
        { id: 'lava_orb', name: 'Лавовый шар', emoji: '🔮', weight: 15, rarity: 'rare', type: 'decor' },
        { id: 'ruby', name: 'Рубин', emoji: '💎', weight: 10, rarity: 'epic', type: 'both' },
    ],
};

const HOMES = {
    basic:     { name: 'Картонная коробка', emoji: '📦', cost: 0, biome: 'all', cssClass: 'home-basic' },
    cozy:      { name: 'Уютная будка', emoji: '🏠', cost: 200, biome: 'all', cssClass: 'home-cozy' },
    deluxe:    { name: 'Вольер делюкс', emoji: '🏰', cost: 500, biome: 'all', cssClass: 'home-deluxe' },
    aquarium:  { name: 'Аквариум', emoji: '🐠', cost: 300, biome: 'aquatic', cssClass: 'home-aquarium' },
    igloo:     { name: 'Иглу', emoji: '🏔', cost: 300, biome: 'frozen', cssClass: 'home-igloo' },
    lava_cave: { name: 'Лавовая пещера', emoji: '🌋', cost: 300, biome: 'volcanic', cssClass: 'home-lava-cave' },
};

const DECOR_ITEMS = [
    { id: 'plant', name: '🌿 Растение', cost: 50, desc: 'Зелёный друг', cssClass: 'decor-plant', rarity: 'common' },
    { id: 'lamp', name: '🏮 Фонарь', cost: 40, desc: 'Уютный свет', cssClass: 'decor-lamp', rarity: 'common' },
    { id: 'carpet', name: '🟫 Коврик', cost: 60, desc: 'Мягко и тепло', cssClass: 'decor-carpet', rarity: 'common' },
    { id: 'poster', name: '🖼 Постер', cost: 35, desc: 'Красота на стене', cssClass: 'decor-poster', rarity: 'common' },
    { id: 'toy', name: '🧸 Игрушка', cost: 70, desc: 'Любимая игрушка', cssClass: 'decor-toy', rarity: 'uncommon' },
    { id: 'pillow', name: '🛏 Подушка', cost: 55, desc: 'Место для отдыха', cssClass: 'decor-pillow', rarity: 'common' },
    { id: 'star', name: '⭐ Звезда', cost: 100, desc: 'Сияет в темноте', cssClass: 'decor-star', rarity: 'rare' },
    { id: 'fountain', name: '⛲ Фонтанчик', cost: 150, desc: 'Журчание воды', cssClass: 'decor-fountain', rarity: 'rare' },
    { id: 'fire', name: '🔥 Костер', cost: 120, desc: 'Тепло и уют', cssClass: 'decor-fire', rarity: 'uncommon' },
    { id: 'crystal', name: '💎 Кристалл', cost: 200, desc: 'Драгоценный камень', cssClass: 'decor-crystal', rarity: 'epic' },
];

const ACHIEVEMENTS = [
    { id: 'first_walk', name: 'Первая прогулка', emoji: '🚶', desc: 'Отправить питомца на первую прогулку' },
    { id: 'collector_10', name: 'Коллекционер', emoji: '🎒', desc: 'Собрать 10 предметов в инвентаре' },
    { id: 'rich_500', name: 'Богач', emoji: '💰', desc: 'Накопить 500 монет' },
    { id: 'adult', name: 'Взросление', emoji: '🎉', desc: 'Питомец стал взрослым' },
    { id: 'all_stats_100', name: 'Идеальная форма', emoji: '💯', desc: 'Все шкалы выше 90 одновременно' },
    { id: 'decor_5', name: 'Дизайнер', emoji: '🎨', desc: 'Купить 5 предметов декора' },
    { id: 'walk_10', name: 'Исследователь', emoji: '🗺', desc: 'Сходить на 10 прогулок' },
    { id: 'survive_week', name: 'Стойкий', emoji: '💪', desc: 'Питомец прожил 7 дней' },
];

const RARITY_CONFIG = {
    common:   { label: 'Обычный', color: '#aaaaaa', stars: '☆' },
    uncommon: { label: 'Необычный', color: '#55cc55', stars: '★' },
    rare:     { label: 'Редкий', color: '#4488ff', stars: '★★' },
    epic:     { label: 'Эпический', color: '#aa44ff', stars: '★★★' },
    legendary:{ label: 'Легендарный', color: '#ff8800', stars: '★★★★' },
};

const RARITY_PRICES = {
    common: 5,
    uncommon: 15,
    rare: 40,
    epic: 100,
    legendary: 250,
};

const FOOD_TYPES = [
    { id: 'meat', name: 'Мясо', emoji: '🥩', diet: ['carnivore', 'omnivore'], effects: { hunger: 25, mood: 5, energy: 5 }, cost: 15, rarity: 'common' },
    { id: 'fish', name: 'Рыба', emoji: '🐟', diet: ['carnivore', 'omnivore'], effects: { hunger: 20, mood: 8, energy: 10 }, cost: 20, rarity: 'common' },
    { id: 'fruit', name: 'Фрукты', emoji: '🍎', diet: ['herbivore', 'omnivore'], effects: { hunger: 15, mood: 10, energy: 10 }, cost: 12, rarity: 'common' },
    { id: 'berries', name: 'Ягоды', emoji: '🫐', diet: ['herbivore', 'omnivore'], effects: { hunger: 12, mood: 15, energy: 5 }, cost: 15, rarity: 'common' },
    { id: 'nectar', name: 'Нектар', emoji: '🍯', diet: ['insectivore', 'omnivore'], effects: { hunger: 10, mood: 20, energy: 10 }, cost: 25, rarity: 'uncommon' },
    { id: 'seeds', name: 'Семена', emoji: '🌰', diet: ['herbivore', 'omnivore'], effects: { hunger: 18, mood: 5, energy: 8 }, cost: 10, rarity: 'common' },
    { id: 'insects', name: 'Насекомые', emoji: '🐛', diet: ['insectivore', 'omnivore'], effects: { hunger: 22, mood: 5, energy: 12 }, cost: 18, rarity: 'common' },
    { id: 'feast', name: 'Пиршество', emoji: '🍖', diet: ['carnivore', 'omnivore', 'herbivore', 'insectivore'], effects: { hunger: 35, mood: 15, energy: 15 }, cost: 50, rarity: 'rare' },
];

const WATER_TYPES = [
    { id: 'water', name: 'Вода', emoji: '💧', diet: ['carnivore', 'herbivore', 'insectivore', 'omnivore'], effects: { energy: 15, health: 5 }, cost: 5, rarity: 'common' },
    { id: 'dew', name: 'Роса', emoji: '🌧️', diet: ['insectivore', 'herbivore', 'omnivore'], effects: { energy: 10, mood: 10 }, cost: 10, rarity: 'common' },
    { id: 'juice', name: 'Сок', emoji: '🧃', diet: ['herbivore', 'omnivore'], effects: { energy: 12, mood: 8 }, cost: 15, rarity: 'uncommon' },
    { id: 'milk', name: 'Молоко', emoji: '🥛', diet: ['carnivore', 'omnivore'], effects: { energy: 20, health: 10 }, cost: 20, rarity: 'uncommon' },
];

const DIET_MAP = {
    redtail: 'omnivore', velvet: 'omnivore', rustle: 'insectivore',
    sandrunner: 'herbivore', spiny: 'herbivore', dune: 'insectivore',
    pearlfinn: 'carnivore', shellback: 'herbivore', clawlet: 'carnivore',
    snowpuff: 'carnivore', icelet: 'carnivore', frostmoth: 'insectivore',
    ember: 'carnivore', ashwing: 'insectivore', magmabeetle: 'insectivore',
};

const FAVORITE_FOOD = {
    redtail: 'berries', velvet: 'fruit', rustle: 'insects',
    sandrunner: 'seeds', spiny: 'nectar', dune: 'insects',
    pearlfinn: 'fish', shellback: 'berries', clawlet: 'fish',
    snowpuff: 'fish', icelet: 'fish', frostmoth: 'nectar',
    ember: 'meat', ashwing: 'nectar', magmabeetle: 'insects',
};

const EXPRESSIONS = {
    happy:  { emoji: '😊', threshold: 70 },
    neutral:{ emoji: '😐', threshold: 40 },
    sad:    { emoji: '😢', threshold: 20 },
    sick:   { emoji: '🤒', threshold: 0 },
    sleepy: { emoji: '😴', threshold: 30, checkStat: 'energy' },
};

const SOUNDS = {
    feed: { freq: 800, dur: 0.15, type: 'sine' },
    pet: { freq: 600, dur: 0.2, type: 'triangle' },
    sleep: { freq: 300, dur: 0.4, type: 'sine' },
    walk: { freq: 500, dur: 0.3, type: 'square' },
    buy: { freq: 1000, dur: 0.1, type: 'sine' },
    achievement: { freq: [1200,1600], dur: 0.15, type: 'sine' },
    stageUp: { freq: [800,1200,1600], dur: 0.2, type: 'triangle' },
    eventStart: { freq: 400, dur: 0.5, type: 'sawtooth' },
};

// ========== ПИКСЕЛЬНЫЕ СПРАЙТЫ (пока только заготовка) ==========
const SPRITE_PALETTES = {
    redtail: {
        r: '#d95c2b', o: '#e87a3e', w: '#f5e6d0', b: '#2a1a0a', g: '#8a7a6a', n: '#c44a2a', e: '#f0c8a0', _: null,
    }
};
const SPRITE_DATA = {
    redtail: [
        '____bbbbbbbb____',
        '___bwwwwwwwwb___',
        '__bwrrrrrrrrwb__',
        '_bwrrrrrrrrrrwb_',
        'bwrrrrrrrrrrrrwb',
        'bwrrrrrrrrrrrrwb',
        'bwrrrrrrrrrrrrwb',
        '_bwrrrrrrrrrrwb_',
        '__bwrrrrrrrrwb__',
        '___bwrrrrrrwb___',
        '____bwwwwwwb____',
        '____bwbbbbwb____',
        '___bwbbbbbbwb___',
        '___bwbbbbbbwb___',
        '____bwbbbbwb____',
        '_____bbbbbb_____',
    ]
};

// ========== СОСТОЯНИЕ ==========
const defaultGameState = () => ({
    screen: 'selection',
    selectedBiome: null,
    selectedPetId: null,
    petName: '',
    pet: {
        biome: null,
        petId: null,
        name: '',
        hunger: 80,
        energy: 80,
        mood: 80,
        health: 100,
        age: 0,
        stage: 'baby',
        coins: 100,
        inventory: [],
        incomeCooldown: 0,
        home: 'basic',
        decor: [],
        activeDecor: [],
        moodExpression: 'neutral',
        birthday: null,
        lastAgeCheck: null,
        isOpenSea: false,
        food: {},
        water: {},
        affection: 50,
        lastInteraction: null,
        scars: [],
        injury: null,
        injuryStart: null,
        lastFeedTime: null,
        runaway: false,
        runawayAttempts: 0,
        searchActive: false,
        searchStartTime: null,
        affectionMax: 100,
        affectionPenaltyPermanent: 0,
        homeDurability: 100,
        homeMaxDurability: 100,
        lastDurabilityUpdate: null,
    },
    lastTick: null,
    walk: { active: false, startTime: null, duration: WALK_DURATION },
    work: { active: false, startTime: null, duration: WORK_DURATION },
    season: { current: 'spring', weekStart: null, event: null, eventEnd: null, lastEventEnd: null },
    achievements: { unlocked: [], notified: [] },
    settings: { soundEnabled: true, nightMode: true },
    shop: {
        items: [
            { id: 'apple', name: '🍎 Яблоко', effect: { hunger: 20 }, cost: 10, desc: '+20 голода' },
            { id: 'cake', name: '🍰 Пирожное', effect: { mood: 20 }, cost: 15, desc: '+20 настроения' },
            { id: 'coffee', name: '☕ Кофе', effect: { energy: 20 }, cost: 15, desc: '+20 энергии' },
            { id: 'medkit', name: '💊 Аптечка', effect: { health: 30 }, cost: 25, desc: '+30 здоровья' },
            { id: 'feast', name: '🍖 Пир', effect: { hunger: 30, mood: 10 }, cost: 30, desc: '+30 голода, +10 настроения' },
            { id: 'ointment', name: '🧴 Мазь', effect: { healInjury: 'burn' }, cost: 40, desc: 'Лечит ожог' },
            { id: 'bandage', name: '🩹 Зелёнка', effect: { healInjury: 'cut' }, cost: 30, desc: 'Лечит царапину' },
            { id: 'splint', name: '🦴 Шина', effect: { healInjury: 'fracture' }, cost: 50, desc: 'Лечит перелом' },
            { id: 'mushroom', name: '🍄 Грибы', effect: { mood: 50, health: -30 }, cost: 20, desc: '⚠️ Опасно! (+настроение, -здоровье)' },
        ],
    },
    walkCount: 0,
    _nightBonus: false,
    releasedPets: [],
    totalPetsStarted: 0,
    eventLog: [],
    neighborVisitCooldown: 0,
    lastFeedDisplay: 0,
});

let gameState = defaultGameState();

// ========== DOM ==========
const $ = (id) => document.getElementById(id);
const selectionScreen = $('selection-screen');
const gameScreen = $('game-screen');
const petGrid = $('pet-grid');
const nameInputArea = $('name-input-area');
const petNameInput = $('pet-name');
const confirmBtn = $('confirm-btn');
const resetBtn = $('reset-btn');
const gameBg = $('game-background');
const petSprite = $('pet-sprite');
const hudName = $('hud-name');
const hudBiome = $('hud-biome');
const hudAge = $('hud-age');
const coinsDisplay = $('coins-display');
const seasonIndicator = $('season-indicator');
const statHunger = $('stat-hunger');
const statEnergy = $('stat-energy');
const statMood = $('stat-mood');
const statHealth = $('stat-health');
const valHunger = $('val-hunger');
const valEnergy = $('val-energy');
const valMood = $('val-mood');
const valHealth = $('val-health');
const btnFeed = $('btn-feed');
const btnDrink = $('btn-drink');
const btnPet = $('btn-pet');
const btnSleep = $('btn-sleep');
const btnWalk = $('btn-walk');
const btnWork = $('btn-work');
const btnGoSea = $('btn-go-sea');
const walkTimer = $('walk-timer');
const walkOverlay = $('walk-overlay');
const workTimer = $('work-timer');
const workOverlay = $('work-overlay');
const inventoryList = $('inventory-list');
const shopPanel = $('shop-panel');
const shopList = $('shop-list');
const btnToggleShop = $('btn-toggle-shop');
const btnCloseShop = $('btn-close-shop');
const homeContainer = $('home-container');
const decorContainer = $('decor-container');
const moodIndicator = $('mood-indicator');
const affectionIndicator = $('affection-indicator');
const scarsContainer = $('scars-container');
const achievementPopup = $('achievement-popup');
const achievementList = $('achievement-list');
const nightOverlay = $('night-overlay');
const offlinePopup = $('offline-popup');
const btnAchievements = $('btn-achievements');
const achievementsPanel = $('achievements-panel');
const btnCloseAchievements = $('btn-close-achievements');
const eventBanner = $('event-banner');
const toast = $('toast');
const foodPanel = $('food-panel');
const foodList = $('food-list');
const btnCloseFood = $('btn-close-food');
const waterPanel = $('water-panel');
const waterList = $('water-list');
const btnCloseWater = $('btn-close-water');

// ========== УТИЛИТЫ ==========
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function saveState() {
    try {
        const data = JSON.stringify(gameState);
        if (data.length > 500000) {
            console.warn('localStorage接近上限, очищаем inventory');
            gameState.pet.inventory = gameState.pet.inventory.slice(-50);
            gameState.pet.decor = gameState.pet.decor.slice(-20);
            gameState.pet.activeDecor = gameState.pet.activeDecor.slice(0, 3);
        }
        localStorage.setItem('tamagotchi_save', JSON.stringify(gameState));
        localStorage.setItem('tamagotchi_last_save', Date.now().toString());
    } catch (e) {
        console.error('Ошибка сохранения:', e);
        showToast('⚠️ Ошибка сохранения. Попробуйте очистить старые предметы.');
        gameState.pet.inventory = gameState.pet.inventory.slice(-20);
        gameState.pet.decor = gameState.pet.decor.slice(-10);
        try { localStorage.setItem('tamagotchi_save', JSON.stringify(gameState)); } catch (e2) {}
    }
}
function loadState() {
    try {
        const saved = localStorage.getItem('tamagotchi_save');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.pet && parsed.pet.petId) {
                const merged = defaultGameState();
                deepMerge(merged, parsed);
                return merged;
            }
        }
    } catch (e) {
        console.warn('Битое сохранение, сбрасываем');
        localStorage.removeItem('tamagotchi_save');
    }
    return null;
}
function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}
function showToast(msg, duration = 2000) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}
function showWalkResult(msg) { showToast(msg, 2500); }

// ========== ЗВУК ==========
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    return audioCtx;
}
function playSound(soundId) {
    if (!gameState.settings.soundEnabled) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const sound = SOUNDS[soundId];
    if (!sound) return;
    try {
        const freqs = Array.isArray(sound.freq) ? sound.freq : [sound.freq];
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = sound.type || 'sine';
            osc.frequency.value = freq;
            gain.gain.value = 0.08;
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + sound.dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + sound.dur + i * 0.1);
        });
    } catch (e) {}
}

// ========== ЭКРАНЫ ==========
function showSelectionScreen() {
    selectionScreen.classList.add('active');
    gameScreen.classList.remove('active');
    gameState.screen = 'selection';
    if (window._gameLoopInterval) { clearInterval(window._gameLoopInterval); window._gameLoopInterval = null; }
    updateSelectionStats();
    if (bgAnimationId) { cancelAnimationFrame(bgAnimationId); bgAnimationId = null; }
    saveState();
}
function showGameScreen() {
    selectionScreen.classList.remove('active');
    gameScreen.classList.add('active');
    const petData = PETS[gameState.pet.biome]?.find(p => p.id === gameState.pet.petId);
    const emoji = petData ? petData.emoji : '❓';
    gameBg.setAttribute('data-biome', gameState.pet.biome);
    petSprite.textContent = emoji;
    hudName.textContent = gameState.pet.name;
    hudAge.textContent = `День ${gameState.pet.age}`;
    const biomeNames = { forest: 'Лес', desert: 'Пустыня', aquatic: 'Вода', frozen: 'Лёд', volcanic: 'Вулкан' };
    hudBiome.textContent = biomeNames[gameState.pet.biome] || '???';
    if (!gameState.pet.birthday) { gameState.pet.birthday = Date.now(); gameState.pet.lastAgeCheck = Date.now(); }
    if (!gameState.pet.incomeCooldown) gameState.pet.incomeCooldown = Date.now() + 60000;
    if (!gameState.pet.food || Object.keys(gameState.pet.food).length === 0) initFoodAndWater();
    if (!gameState.pet.water || Object.keys(gameState.pet.water).length === 0) {
        if (!gameState.pet.food || Object.keys(gameState.pet.food).length === 0) initFoodAndWater();
        else {
            const petId = gameState.pet.petId;
            const diet = DIET_MAP[petId] || 'omnivore';
            const waterItems = WATER_TYPES.filter(w => w.diet.includes(diet));
            const starterWater = waterItems.length > 0 ? waterItems[0].id : 'water';
            gameState.pet.water = {};
            WATER_TYPES.forEach(w => { gameState.pet.water[w.id] = 0; });
            gameState.pet.water[starterWater] = 5;
        }
    }
    if (!gameState.pet.scars) gameState.pet.scars = [];
    if (gameState.pet.affection === undefined) gameState.pet.affection = 50;
    if (gameState.pet.lastInteraction === undefined) gameState.pet.lastInteraction = Date.now();
    if (!gameState.pet.affectionMax) gameState.pet.affectionMax = 100;
    if (!gameState.pet.homeDurability) gameState.pet.homeDurability = HOME_DURABILITY_MAX;
    if (!gameState.pet.lastDurabilityUpdate) gameState.pet.lastDurabilityUpdate = Date.now();

    updateStatBars();
    updateCoinsDisplay();
    updateWalkUI();
    updateWorkUI();
    updateMoodExpression();
    updateAffectionUI();
    updateScarsUI();
    updateAquariumUI();
    updateSeasonUI();
    updateEventUI();
    renderInventory();
    renderShop();
    renderHome();
    renderActiveDecor();
    renderHomeShop();
    renderAchievementsPanel();
    checkAgeProgression();
    updateLastFeedIndicator();
    gameState.lastTick = Date.now();
    saveState();
    startGameLoop();
    initWeatherCanvas();
    updateSky();
    if (window._skyInterval) clearInterval(window._skyInterval);
    window._skyInterval = setInterval(updateSky, 10000);
    initBackground();
}
function startGameLoop() {
    if (window._gameLoopInterval) clearInterval(window._gameLoopInterval);
    window._gameLoopInterval = setInterval(tick, 1000);
}
function tick() {
    const now = Date.now();
    if (!gameState.lastTick) { gameState.lastTick = now; return; }
    const elapsed = (now - gameState.lastTick) / 1000 / 60;
    gameState.lastTick = now;
    if (elapsed <= 0) return;
    const effectiveElapsed = Math.min(elapsed, 10);

    const decay = getEffectiveDecay();
    gameState.pet.hunger = clamp(gameState.pet.hunger - decay.hunger * effectiveElapsed, 0, 100);
    gameState.pet.energy = clamp(gameState.pet.energy - decay.energy * effectiveElapsed, 0, 100);
    gameState.pet.mood = clamp(gameState.pet.mood - decay.mood * effectiveElapsed, 0, 100);

    if (gameState.pet.injury) {
        const injuryData = INJURY_TYPES[gameState.pet.injury];
        if (injuryData) {
            gameState.pet.health = clamp(gameState.pet.health - injuryData.damagePerTick * effectiveElapsed, 0, 100);
            if (gameState.pet.health <= 0) {
                gameState.pet.health = 0;
                showToast('💀 Питомец погиб от травм! Перезапустите игру.');
            }
        }
    }

    recalcHealth();
    processPassiveIncome();
    updateWalkTimer();
    updateWorkTimer();
    checkAgeProgression();
    updateSeason();
    updateMoodExpression();
    updateAffectionUI();
    checkAchievements();
    updateStatBars();
    updateLastFeedIndicator();
    updateHomeDurability(effectiveElapsed);

    // Голод и побег
    if (!gameState.pet.runaway && !gameState.pet.searchActive) {
        const hungerDays = getHungerStrikeDays();
        if (hungerDays > HUNGER_STRIKE_DAYS_FOR_DAMAGE) {
            const damage = (hungerDays - HUNGER_STRIKE_DAYS_FOR_DAMAGE) * 0.02 * effectiveElapsed;
            gameState.pet.health = clamp(gameState.pet.health - damage, 0, 100);
            if (gameState.pet.health <= 0) { triggerRunaway('death'); return; }
        }
        if (hungerDays > HUNGER_STRIKE_DAYS_FOR_RUNAWAY) {
            const excessHours = (hungerDays - HUNGER_STRIKE_DAYS_FOR_RUNAWAY) * 24;
            let chancePerHour = Math.min(RUNAWAY_CHANCE_BASE + excessHours * 0.01, RUNAWAY_CHANCE_MAX);
            const event = gameState.season?.event;
            const extremeWeather = event && ['Ливень', 'Метель', 'Засуха', 'Похолодание'].includes(event.name);
            if (extremeWeather) chancePerHour *= (1 - RUNAWAY_WEATHER_MODIFIER);
            if (Math.random() < chancePerHour / 60) { triggerRunaway('hunger'); return; }
        }
        updateRunawayWarning(hungerDays);
    }

    // Свежесть еды
    updateFoodFreshness(effectiveElapsed);

    // Автоматическое поведение при высокой привязанности
    if (!gameState.walk.active && !gameState.work.active && !gameState.pet.runaway) {
        affectionTimer += elapsed;
        if (affectionTimer >= 0.75) {
            affectionTimer = 0;
            if (gameState.pet.affection >= 60) {
                const chance = gameState.pet.affection >= 80 ? 0.7 : 0.4;
                if (Math.random() < chance) triggerAffectionEvent();
            }
        }
    }

    // Визит соседа
    checkNeighborVisit();

    saveState();
}
let affectionTimer = 0;

function recalcHealth() {
    // health обновляется в tick, здесь просто отображение
}
function updateStatBars() {
    const stats = [
        { bar: statHunger, val: valHunger, v: gameState.pet.hunger },
        { bar: statEnergy, val: valEnergy, v: gameState.pet.energy },
        { bar: statMood, val: valMood, v: gameState.pet.mood },
        { bar: statHealth, val: valHealth, v: gameState.pet.health },
    ];
    stats.forEach(s => {
        if (!s.bar || !s.val) return;
        s.bar.style.width = s.v + '%';
        s.val.textContent = Math.round(s.v);
        if (s.v > 60) s.bar.style.background = '#4caf50';
        else if (s.v > 30) s.bar.style.background = '#ff9800';
        else s.bar.style.background = '#f44336';
    });
}

// ========== ПРИВЯЗАННОСТЬ ==========
function changeAffection(delta) {
    const max = gameState.pet.affectionMax || 100;
    gameState.pet.affection = clamp(gameState.pet.affection + delta, 0, max);
    gameState.pet.lastInteraction = Date.now();
    updateAffectionUI();
    saveState();
}
function updateAffectionUI() {
    if (!affectionIndicator) return;
    const val = gameState.pet.affection || 0;
    const max = gameState.pet.affectionMax || 100;
    const color = val > 80 ? '#ff1744' : val > 60 ? '#ff9100' : val > 40 ? '#ffea00' : '#aaaaaa';
    affectionIndicator.style.color = color;
    affectionIndicator.style.transform = `scale(${1 + (val / 200)})`;
    affectionIndicator.title = `Привязанность: ${Math.round(val)}% (макс. ${Math.round(max)}%)`;
}
function triggerAffectionEvent() {
    const thoughts = ['Я тебя люблю! ❤️','Ты мой лучший друг!','Как я рад тебя видеть!','Ты такой заботливый!','Мур-мур 😻','Спасибо, что ты у меня есть!'];
    const msg = thoughts[Math.floor(Math.random() * thoughts.length)];
    showToast(msg, 2000);
    const scale = STAGES[gameState.pet.stage].spriteScale || 1;
    petSprite.style.transition = 'transform 0.5s ease';
    petSprite.style.transform = `scale(${scale * 1.2})`;
    setTimeout(() => {
        petSprite.style.transform = `scale(${scale})`;
        setTimeout(() => { petSprite.style.transition = ''; }, 300);
    }, 500);
    gameState.pet.mood = clamp(gameState.pet.mood + 5, 0, 100);
    updateStatBars();
    spawnFloatingEmojis('❤️', 8, 1500);
}

// ========== ШРАМЫ ==========
function addScar(traumaType) {
    const emojiMap = { 'burn': '🔥', 'cut': '🩹', 'fracture': '🦴' };
    const nameMap = { 'burn': 'Ожог', 'cut': 'Царапина', 'fracture': 'Перелом' };
    const scar = { type: traumaType, emoji: emojiMap[traumaType] || '❓', name: nameMap[traumaType] || 'Травма', date: Date.now(), day: gameState.pet.age };
    if (!gameState.pet.scars) gameState.pet.scars = [];
    gameState.pet.scars.push(scar);
    if (gameState.pet.scars.length > 10) gameState.pet.scars = gameState.pet.scars.slice(-10);
    updateScarsUI();
    saveState();
}
function updateScarsUI() {
    if (!scarsContainer) return;
    scarsContainer.innerHTML = '';
    const scars = gameState.pet.scars || [];
    if (scars.length === 0) return;
    const recent = scars.slice(-3).reverse();
    recent.forEach(scar => {
        const el = document.createElement('span');
        el.className = 'scar-icon';
        el.textContent = scar.emoji;
        el.title = `${scar.name} (день ${scar.day})`;
        scarsContainer.appendChild(el);
    });
}

// ========== ТРАВМЫ ==========
const INJURY_TYPES = {
    burn: { name: 'Ожог', emoji: '🔥', damagePerTick: 0.05, healItem: 'ointment', effects: { hunger: -0.2, mood: -0.3 } },
    cut: { name: 'Царапина', emoji: '🩹', damagePerTick: 0.03, healItem: 'bandage', effects: { hunger: -0.1, mood: -0.2 } },
    fracture: { name: 'Перелом', emoji: '🦴', damagePerTick: 0.08, healItem: 'splint', effects: { energy: -0.3, mood: -0.4 } },
};
function applyInjury(type) {
    if (gameState.pet.injury) { showToast('У питомца уже есть травма!'); return; }
    const injury = INJURY_TYPES[type];
    if (!injury) return;
    gameState.pet.injury = type;
    gameState.pet.injuryStart = Date.now();
    gameState.pet.health = clamp(gameState.pet.health - 15, 0, 100);
    addScar(type);
    showToast(`⚠️ Травма: ${injury.emoji} ${injury.name}!`, 3000);
    spawnFloatingEmojis('💥', 8, 1000);
    updateMoodExpression();
    addEvent('injury', `${gameState.pet.name} получил травму: ${injury.name}`, '💥');
    saveState();
}

// ========== ЕДА И ВОДА ИНИЦИАЛИЗАЦИЯ ==========
function initFoodAndWater() {
    const petId = gameState.pet.petId;
    const diet = DIET_MAP[petId] || 'omnivore';
    const foodItems = FOOD_TYPES.filter(f => f.diet.includes(diet));
    const waterItems = WATER_TYPES.filter(w => w.diet.includes(diet));
    const starterFood = foodItems.length > 0 ? foodItems[0].id : 'fruit';
    const starterWater = waterItems.length > 0 ? waterItems[0].id : 'water';
    gameState.pet.food = {};
    FOOD_TYPES.forEach(f => { gameState.pet.food[f.id] = []; });
    WATER_TYPES.forEach(w => { gameState.pet.water[w.id] = []; });
    gameState.pet.food[starterFood] = [{ amount: 5, freshness: 100 }];
    gameState.pet.water[starterWater] = [{ amount: 5, freshness: 100 }];
}

// ========== ПАНЕЛИ ЕДЫ И ВОДЫ ==========
function openFoodPanel() {
    if (!foodPanel) return;
    foodPanel.classList.add('open');
    renderFoodPanel();
}
function closeFoodPanel() { if (foodPanel) foodPanel.classList.remove('open'); }
function renderFoodPanel() {
    if (!foodList) return;
    foodList.innerHTML = '';
    const petId = gameState.pet.petId;
    const diet = DIET_MAP[petId] || 'omnivore';
    const favorite = FAVORITE_FOOD[petId] || null;
    let hasFood = false;
    for (const [id, entries] of Object.entries(gameState.pet.food)) {
        const summary = getFoodSummary(id);
        if (summary.totalAmount <= 0 || summary.minFreshness <= 0) continue;
        const food = FOOD_TYPES.find(f => f.id === id);
        if (!food || !food.diet.includes(diet)) continue;
        hasFood = true;
        const isFavorite = (id === favorite);
        const card = document.createElement('div');
        card.className = 'shop-item';
        card.innerHTML = `
            <div class="shop-item-name">${food.emoji} ${food.name} ${isFavorite ? '⭐' : ''}</div>
            <div class="shop-item-desc">+голод ${food.effects.hunger || 0}, +настр ${food.effects.mood || 0}, +энерг ${food.effects.energy || 0}</div>
            <div class="shop-item-cost">${summary.totalAmount} шт (${Math.round(summary.minFreshness)}%)</div>
        `;
        card.addEventListener('click', () => eatFood(id));
        foodList.appendChild(card);
    }
    if (!hasFood) {
        foodList.innerHTML = '<div class="shop-item" style="justify-content:center;color:#888;">Нет свежей еды. Купите в магазине.</div>';
    }
}
function openWaterPanel() {
    if (!waterPanel) return;
    waterPanel.classList.add('open');
    renderWaterPanel();
}
function closeWaterPanel() { if (waterPanel) waterPanel.classList.remove('open'); }
function renderWaterPanel() {
    if (!waterList) return;
    waterList.innerHTML = '';
    const petId = gameState.pet.petId;
    const diet = DIET_MAP[petId] || 'omnivore';
    let hasWater = false;
    for (const [id, entries] of Object.entries(gameState.pet.water)) {
        const total = entries.reduce((s, e) => s + e.amount, 0);
        if (total <= 0) continue;
        const water = WATER_TYPES.find(w => w.id === id);
        if (!water || !water.diet.includes(diet)) continue;
        hasWater = true;
        const card = document.createElement('div');
        card.className = 'shop-item';
        card.innerHTML = `
            <div class="shop-item-name">${water.emoji} ${water.name}</div>
            <div class="shop-item-desc">+энерг ${water.effects.energy || 0}, +здоровье ${water.effects.health || 0}</div>
            <div class="shop-item-cost">${total} шт</div>
        `;
        card.addEventListener('click', () => drinkWater(id));
        waterList.appendChild(card);
    }
    if (!hasWater) {
        waterList.innerHTML = '<div class="shop-item" style="justify-content:center;color:#888;">Нет воды. Купите в магазине.</div>';
    }
}

// ========== СВЕЖЕСТЬ ==========
function getFoodSummary(id) {
    const entries = gameState.pet.food[id] || [];
    let total = 0, minFresh = 100, sumFresh = 0, count = 0;
    for (const entry of entries) {
        if (entry.amount <= 0) continue;
        total += entry.amount;
        if (entry.freshness < minFresh) minFresh = entry.freshness;
        sumFresh += entry.freshness * entry.amount;
        count += entry.amount;
    }
    const avgFresh = count > 0 ? sumFresh / count : 0;
    return { totalAmount: total, minFreshness: minFresh, avgFreshness: avgFresh };
}
function getFreshFoodItem(id) {
    const entries = gameState.pet.food[id] || [];
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].amount > 0 && entries[i].freshness > 0) {
            return { index: i, entry: entries[i] };
        }
    }
    return null;
}
function updateFoodFreshness(minutes) {
    const season = gameState.season.current;
    const event = gameState.season.event;
    let decay = FRESHNESS_DECAY_BASE;
    if (season === 'winter') decay = FRESHNESS_DECAY_WINTER;
    else if (season === 'summer') decay = FRESHNESS_DECAY_SUMMER;
    if (event && (event.name === 'Засуха' || event.name === 'Солнечный день')) {
        decay *= FRESHNESS_DECAY_HOT_MULTIPLIER;
    }
    for (const id of Object.keys(gameState.pet.food)) {
        const entries = gameState.pet.food[id];
        for (const entry of entries) {
            if (entry.amount > 0) {
                entry.freshness = Math.max(0, entry.freshness - decay * minutes);
            }
        }
    }
}

function eatFood(foodId) {
    if (Date.now() - lastActionTime < ACTION_COOLDOWN) return;
    lastActionTime = Date.now();
    const summary = getFoodSummary(foodId);
    if (summary.totalAmount <= 0) { showToast('Нет этой еды!'); return; }
    if (summary.minFreshness <= 0) { showToast('Эта еда испорчена! Нельзя кормить.'); return; }
    if (gameState.walk.active || gameState.work.active) { showToast('Питомец занят!'); return; }

    const petId = gameState.pet.petId;
    const anim = PET_ANIMATIONS[petId];
    if (anim && anim.states.eating) {
        setPetAnimation('eating', 1800);
        showTemporaryFood(FOOD_TYPES.find(f => f.id === foodId)?.emoji || '🍗');
    }
    setTimeout(() => {
        applyFoodEffects(foodId);
        const favorite = FAVORITE_FOOD[gameState.pet.petId] || null;
        if (foodId === favorite) {
            spawnFloatingEmojis('❤️', 15, 2000);
            showToast('⭐ Любимая еда! Настроение +10');
            changeAffection(4);
        } else {
            spawnFloatingEmojis('😊', 8, 1500);
            changeAffection(2);
        }
        setTimeout(() => { setPetAnimation('idle', 0); }, 1500);
    }, 1800);
}
function applyFoodEffects(foodId) {
    let food = FOOD_TYPES.find(f => f.id === foodId);
    if (!food && foodId.startsWith('cooked_')) {
        const baseId = foodId.replace('cooked_', '');
        const baseFood = FOOD_TYPES.find(f => f.id === baseId);
        if (baseFood) {
            food = { ...baseFood, effects: { hunger: (baseFood.effects.hunger || 0) * 1.5, mood: (baseFood.effects.mood || 0) + 10, energy: (baseFood.effects.energy || 0) + 5 } };
        }
    }
    if (!food) { showToast('Неизвестная еда!'); return; }
    const freshItem = getFreshFoodItem(foodId);
    if (!freshItem) { showToast('Нет свежей еды!'); return; }
    if (food.effects.hunger) gameState.pet.hunger = clamp(gameState.pet.hunger + food.effects.hunger, 0, 100);
    if (food.effects.mood) gameState.pet.mood = clamp(gameState.pet.mood + food.effects.mood, 0, 100);
    if (food.effects.energy) gameState.pet.energy = clamp(gameState.pet.energy + food.effects.energy, 0, 100);
    if (food.effects.health) gameState.pet.health = clamp(gameState.pet.health + food.effects.health, 0, 100);
    const favorite = FAVORITE_FOOD[gameState.pet.petId] || null;
    if (foodId === favorite) gameState.pet.mood = clamp(gameState.pet.mood + 10, 0, 100);
    const { index, entry } = freshItem;
    entry.amount -= 1;
    if (entry.amount <= 0) gameState.pet.food[foodId].splice(index, 1);
    gameState.pet.lastFeedTime = Date.now();
    recalcHealth();
    updateStatBars();
    renderFoodPanel();
    renderInventory();
    playSound('feed');
    saveState();
}
function showTemporaryFood(emoji) {
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.cssText = 'position:absolute;font-size:40px;top:20%;left:50%;transform:translateX(-50%);pointer-events:none;z-index:20;transition:all 0.8s ease;opacity:1;';
    document.getElementById('pet-area').appendChild(el);
    requestAnimationFrame(() => {
        el.style.transform = 'translateX(-50%) translateY(-60px) scale(0.5)';
        el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 900);
}
function drinkWater(waterId) {
    const water = WATER_TYPES.find(w => w.id === waterId);
    if (!water) return;
    const entries = gameState.pet.water[waterId] || [];
    let total = entries.reduce((s, e) => s + e.amount, 0);
    if (total <= 0) { showToast('Нет этой воды!'); return; }
    if (water.effects.energy) gameState.pet.energy = clamp(gameState.pet.energy + water.effects.energy, 0, 100);
    if (water.effects.health) gameState.pet.health = clamp(gameState.pet.health + water.effects.health, 0, 100);
    if (water.effects.mood) gameState.pet.mood = clamp(gameState.pet.mood + water.effects.mood, 0, 100);
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].amount > 0) { entries[i].amount -= 1; break; }
    }
    gameState.pet.water[waterId] = entries.filter(e => e.amount > 0);
    recalcHealth();
    updateStatBars();
    renderWaterPanel();
    renderInventory();
    playSound('feed');
    changeAffection(1);
    saveState();
}
let lastActionTime = 0;

// ========== ЭКОНОМИКА ==========
function processPassiveIncome() {
    const now = Date.now();
    if (!gameState.pet.incomeCooldown || gameState.pet.incomeCooldown <= 0) {
        gameState.pet.incomeCooldown = now + 60000;
        return;
    }
    if (now >= gameState.pet.incomeCooldown) {
        const minutesPassed = Math.floor((now - gameState.pet.incomeCooldown + 60000) / 60000);
        gameState.pet.coins += INCOME_RATE * Math.min(minutesPassed, 10);
        gameState.pet.incomeCooldown = now + 60000;
        updateCoinsDisplay();
    }
}
function updateCoinsDisplay() { if (coinsDisplay) coinsDisplay.textContent = `🪙 ${gameState.pet.coins}`; }

// ========== МАГАЗИН ==========
function toggleShop() { if (shopPanel) shopPanel.classList.toggle('open'); renderShop(); }
function renderShop() {
    if (!shopList) return;
    shopList.innerHTML = '';
    const itemsSection = document.createElement('div');
    itemsSection.className = 'shop-section';
    itemsSection.innerHTML = '<div class="shop-section-title">🧪 Зелья и предметы</div>';
    gameState.shop.items.forEach(item => {
        const canAfford = gameState.pet.coins >= item.cost;
        const card = document.createElement('div');
        card.className = 'shop-item';
        if (!canAfford) card.classList.add('locked');
        card.innerHTML = `<div class="shop-item-name">${item.name}</div><div class="shop-item-desc">${item.desc}</div><div class="shop-item-cost">🪙 ${item.cost}</div>`;
        card.addEventListener('click', () => { if (canAfford) buyItem(item); });
        itemsSection.appendChild(card);
    });
    shopList.appendChild(itemsSection);
    const foodSection = document.createElement('div');
    foodSection.className = 'shop-section';
    foodSection.innerHTML = '<div class="shop-section-title">🍗 Еда</div>';
    const petId = gameState.pet.petId;
    const diet = DIET_MAP[petId] || 'omnivore';
    FOOD_TYPES.forEach(food => {
        if (!food.diet.includes(diet)) return;
        const canAfford = gameState.pet.coins >= food.cost;
        const card = document.createElement('div');
        card.className = 'shop-item';
        if (!canAfford) card.classList.add('locked');
        card.innerHTML = `<div class="shop-item-name">${food.emoji} ${food.name}</div><div class="shop-item-desc">+голод ${food.effects.hunger || 0}, +настр ${food.effects.mood || 0}, +энерг ${food.effects.energy || 0}</div><div class="shop-item-cost">🪙 ${food.cost}</div>`;
        card.addEventListener('click', () => { if (canAfford) buyFood(food.id); });
        foodSection.appendChild(card);
    });
    shopList.appendChild(foodSection);
    const waterSection = document.createElement('div');
    waterSection.className = 'shop-section';
    waterSection.innerHTML = '<div class="shop-section-title">💧 Вода</div>';
    WATER_TYPES.forEach(water => {
        if (!water.diet.includes(diet)) return;
        const canAfford = gameState.pet.coins >= water.cost;
        const card = document.createElement('div');
        card.className = 'shop-item';
        if (!canAfford) card.classList.add('locked');
        card.innerHTML = `<div class="shop-item-name">${water.emoji} ${water.name}</div><div class="shop-item-desc">+энерг ${water.effects.energy || 0}, +здоровье ${water.effects.health || 0}</div><div class="shop-item-cost">🪙 ${water.cost}</div>`;
        card.addEventListener('click', () => { if (canAfford) buyWater(water.id); });
        waterSection.appendChild(card);
    });
    shopList.appendChild(waterSection);
}
function buyItem(item) {
    if (gameState.pet.coins < item.cost) return;
    if (item.effect.healInjury) {
        if (gameState.pet.injury === item.effect.healInjury) {
            gameState.pet.coins -= item.cost;
            const injury = INJURY_TYPES[gameState.pet.injury];
            gameState.pet.injury = null;
            gameState.pet.injuryStart = null;
            showToast(`✅ Травма вылечена!`);
            addEvent('heal', `${gameState.pet.name} вылечил ${injury.name}`, '💊');
            playSound('buy');
            updateMoodExpression();
            renderShop();
            updateStatBars();
            saveState();
            return;
        } else { showToast('Это лекарство не подходит для текущей травмы!'); return; }
    }
    if (item.id === 'mushroom') {
        if (confirm('⚠️ Опасно! Грибы вызовут сильное опьянение: +50 настроения, но -30 здоровья. Продолжить?')) {
            gameState.pet.coins -= item.cost;
            gameState.pet.mood = clamp(gameState.pet.mood + 50, 0, 100);
            gameState.pet.health = clamp(gameState.pet.health - 30, 0, 100);
            recalcHealth();
            updateStatBars();
            updateCoinsDisplay();
            playSound('buy');
            showToast('🍄 Грибы съедены! Настроение взлетело, но здоровье пострадало.');
            renderShop();
            saveState();
        }
        return;
    }
    gameState.pet.coins -= item.cost;
    if (item.effect.hunger) gameState.pet.hunger = clamp(gameState.pet.hunger + item.effect.hunger, 0, 100);
    if (item.effect.energy) gameState.pet.energy = clamp(gameState.pet.energy + item.effect.energy, 0, 100);
    if (item.effect.mood)   gameState.pet.mood   = clamp(gameState.pet.mood + item.effect.mood, 0, 100);
    if (item.effect.health) gameState.pet.health = clamp(gameState.pet.health + item.effect.health, 0, 100);
    recalcHealth();
    updateStatBars();
    updateCoinsDisplay();
    renderShop();
    playSound('buy');
    showToast(`Куплено: ${item.name}`, 1500);
    saveState();
}
function buyFood(foodId) {
    const food = FOOD_TYPES.find(f => f.id === foodId);
    if (!food) return;
    if (gameState.pet.coins < food.cost) { showToast('Недостаточно монет'); return; }
    gameState.pet.coins -= food.cost;
    if (!gameState.pet.food[foodId]) gameState.pet.food[foodId] = [];
    gameState.pet.food[foodId].push({ amount: 1, freshness: 100 });
    updateCoinsDisplay();
    renderShop();
    renderInventory();
    playSound('buy');
    showToast(`Куплено: ${food.emoji} ${food.name}`, 1500);
    saveState();
}
function buyWater(waterId) {
    const water = WATER_TYPES.find(w => w.id === waterId);
    if (!water) return;
    if (gameState.pet.coins < water.cost) { showToast('Недостаточно монет'); return; }
    gameState.pet.coins -= water.cost;
    if (!gameState.pet.water[waterId]) gameState.pet.water[waterId] = [];
    gameState.pet.water[waterId].push({ amount: 1, freshness: 100 });
    updateCoinsDisplay();
    renderShop();
    renderInventory();
    playSound('buy');
    showToast(`Куплено: ${water.emoji} ${water.name}`, 1500);
    saveState();
}

// ========== ИНВЕНТАРЬ ==========
function renderInventory() {
    if (!inventoryList) return;
    inventoryList.innerHTML = '';

    // Лут
    const lootSection = document.createElement('div');
    const lootTitle = document.createElement('div');
    lootTitle.className = 'inventory-title';
    lootTitle.textContent = '🎒 Добыча';
    lootSection.appendChild(lootTitle);
    const lootContainer = document.createElement('div');
    lootContainer.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';
    const inv = gameState.pet.inventory || [];
    if (inv.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'inventory-empty';
        empty.textContent = 'Пусто';
        lootContainer.appendChild(empty);
    } else {
        inv.forEach((item, index) => {
            const el = document.createElement('span');
            el.className = 'inventory-slot';
            const display = item.emoji + ' ' + item.name;
            el.textContent = display;
            const rarity = item.rarity || 'common';
            const config = RARITY_CONFIG[rarity] || RARITY_CONFIG.common;
            el.style.border = `2px solid ${config.color}`;
            el.style.borderRadius = '4px';
            el.style.padding = '0 4px';
            el.style.background = 'rgba(255,255,255,0.05)';
            el.title = `${display} (${config.label} ${config.stars})`;
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => openItemModal(index));
            lootContainer.appendChild(el);
        });
    }
    lootSection.appendChild(lootContainer);
    inventoryList.appendChild(lootSection);

    // Еда
    const foodSection = document.createElement('div');
    foodSection.style.marginBottom = '4px';
    const foodTitle = document.createElement('div');
    foodTitle.className = 'inventory-title';
    foodTitle.textContent = '🍗 Еда';
    foodSection.appendChild(foodTitle);
    const foodContainer = document.createElement('div');
    foodContainer.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';
    let hasFood = false;
    for (const [id, entries] of Object.entries(gameState.pet.food)) {
        const summary = getFoodSummary(id);
        if (summary.totalAmount <= 0) continue;
        hasFood = true;
        let food = FOOD_TYPES.find(f => f.id === id);
        let displayName, emoji;
        if (food) { displayName = food.name; emoji = food.emoji; }
        else if (id.startsWith('cooked_')) {
            const baseId = id.replace('cooked_', '');
            const baseFood = FOOD_TYPES.find(f => f.id === baseId);
            if (baseFood) { displayName = `Приготовленная ${baseFood.name}`; emoji = baseFood.emoji + '🔥'; }
            else { displayName = 'Приготовленная еда'; emoji = '🍲'; }
        } else continue;
        const el = document.createElement('span');
        el.className = 'inventory-slot';
        el.textContent = `${emoji}${summary.totalAmount}`;
        const freshness = summary.minFreshness;
        let bgColor = '#4caf50';
        if (freshness < 30) bgColor = '#f44336';
        else if (freshness < 70) bgColor = '#ff9800';
        el.style.background = `rgba(${bgColor === '#4caf50' ? '76,175,80' : bgColor === '#ff9800' ? '255,152,0' : '244,67,54'}, 0.3)`;
        el.style.border = `2px solid ${bgColor}`;
        el.style.borderRadius = '4px';
        el.style.padding = '0 4px';
        el.style.fontSize = '10px';
        el.title = `${displayName}: ${Math.round(freshness)}% свежести`;
        foodContainer.appendChild(el);
    }
    if (!hasFood) {
        const empty = document.createElement('div');
        empty.className = 'inventory-empty';
        empty.textContent = 'Нет еды';
        foodContainer.appendChild(empty);
    }
    foodSection.appendChild(foodContainer);
    inventoryList.appendChild(foodSection);

    // Вода
    const waterSection = document.createElement('div');
    const waterTitle = document.createElement('div');
    waterTitle.className = 'inventory-title';
    waterTitle.textContent = '💧 Вода';
    waterSection.appendChild(waterTitle);
    const waterContainer = document.createElement('div');
    waterContainer.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';
    let hasWater = false;
    for (const [id, entries] of Object.entries(gameState.pet.water)) {
        const total = entries.reduce((s, e) => s + e.amount, 0);
        if (total <= 0) continue;
        hasWater = true;
        const water = WATER_TYPES.find(w => w.id === id);
        if (!water) continue;
        const el = document.createElement('span');
        el.className = 'inventory-slot';
        el.textContent = `${water.emoji}${total}`;
        el.style.fontSize = '10px';
        el.style.border = '1px solid #4a8aba';
        el.style.borderRadius = '4px';
        el.style.padding = '0 4px';
        waterContainer.appendChild(el);
    }
    if (!hasWater) {
        const empty = document.createElement('div');
        empty.className = 'inventory-empty';
        empty.textContent = 'Нет воды';
        waterContainer.appendChild(empty);
    }
    waterSection.appendChild(waterContainer);
    inventoryList.appendChild(waterSection);
}

// ========== МОДАЛКА ПРЕДМЕТА ==========
function openItemModal(index) {
    const inv = gameState.pet.inventory;
    if (index < 0 || index >= inv.length) return;
    const item = inv[index];
    if (!item) return;
    const modal = document.getElementById('item-modal');
    const body = document.getElementById('item-modal-body');
    if (!modal || !body) return;
    const rarity = item.rarity || 'common';
    const config = RARITY_CONFIG[rarity] || RARITY_CONFIG.common;
    const price = RARITY_PRICES[rarity] || 5;
    const isLoot = item.type === 'loot' || item.type === 'both';
    const isDecor = item.type === 'decor' || item.type === 'both';
    const canSell = isLoot;
    const canDecorate = isDecor && !gameState.pet.decor.includes(item.id);
    body.innerHTML = `
        <div class="item-modal-emoji">${item.emoji || '❓'}</div>
        <div class="item-modal-name">${item.name || 'Неизвестно'}</div>
        <div class="item-modal-rarity" style="color:${config.color}">${config.label} ${config.stars}</div>
        <div class="item-modal-type">${item.type === 'both' ? '🎨 Можно продать и украсить' : item.type === 'decor' ? '🏠 Только для декора' : '💰 Только на продажу'}</div>
        <div class="item-modal-price">💰 Цена: ${price} монет</div>
        <div class="item-modal-buttons">
            <button class="item-modal-btn sell" ${canSell ? '' : 'disabled'}>💰 Продать</button>
            <button class="item-modal-btn decor" ${canDecorate ? '' : 'disabled'}>🏠 Украсить дом</button>
        </div>
    `;
    modal.style.display = 'flex';
    const sellBtn = body.querySelector('.sell');
    const decorBtn = body.querySelector('.decor');
    if (sellBtn) {
        sellBtn.addEventListener('click', () => {
            if (!canSell) return;
            gameState.pet.coins += price;
            gameState.pet.inventory.splice(index, 1);
            updateCoinsDisplay();
            renderInventory();
            playSound('buy');
            showToast(`Продано за ${price} 🪙`, 1500);
            closeItemModal();
            saveState();
        });
    }
    if (decorBtn) {
        decorBtn.addEventListener('click', () => {
            if (!canDecorate) return;
            if (!gameState.pet.decor.includes(item.id)) {
                gameState.pet.decor.push(item.id);
                if (!gameState.pet.activeDecor) gameState.pet.activeDecor = [];
                if (gameState.pet.activeDecor.length < 3) gameState.pet.activeDecor.push(item.id);
                gameState.pet.inventory.splice(index, 1);
                renderActiveDecor();
                renderHomeShop();
                renderInventory();
                playSound('buy');
                showToast(`Предмет добавлен в декор!`, 1500);
                closeItemModal();
                saveState();
            } else { showToast('Этот предмет уже есть в декоре.'); }
        });
    }
    modal.addEventListener('click', (e) => { if (e.target === modal) closeItemModal(); });
}
function closeItemModal() { const modal = document.getElementById('item-modal'); if (modal) modal.style.display = 'none'; }

// ========== ДОМ ==========
function renderHome() {
    const homeId = gameState.pet.home;
    const home = HOMES[homeId] || HOMES.basic;
    const durability = gameState.pet.homeDurability || 0;
    const percent = durability / HOME_DURABILITY_MAX;
    let statusClass = '';
    let statusEmoji = home.emoji;
    if (percent > 0.7) statusClass = 'home-good';
    else if (percent > 0.4) { statusClass = 'home-damaged'; statusEmoji = '🏚️'; }
    else if (percent > 0) { statusClass = 'home-broken'; statusEmoji = '💔'; }
    else { statusClass = 'home-destroyed'; statusEmoji = '💀'; }
    if (homeContainer) {
        homeContainer.className = `home-container ${home.cssClass || ''} ${statusClass}`;
        homeContainer.innerHTML = `<span class="home-emoji">${statusEmoji}</span>`;
        let indicator = homeContainer.querySelector('.durability-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'durability-indicator';
            homeContainer.appendChild(indicator);
        }
        const width = Math.max(0, percent * 100);
        indicator.style.width = width + '%';
        indicator.style.background = percent > 0.7 ? '#4caf50' : percent > 0.4 ? '#ff9800' : '#f44336';
    }
}
function upgradeHome(homeId) {
    const home = HOMES[homeId];
    if (!home) return;
    if (home.biome !== 'all' && home.biome !== gameState.pet.biome) { showToast('Этот дом не подходит для твоего биома!'); return; }
    if (gameState.pet.home === homeId) { showToast('У тебя уже есть такой дом!'); return; }
    if (gameState.pet.coins < home.cost) { showToast('Недостаточно монет!'); return; }
    gameState.pet.coins -= home.cost;
    gameState.pet.home = homeId;
    updateCoinsDisplay();
    renderHome();
    renderHomeShop();
    saveState();
    showToast(`Новый дом: ${home.name}!`, 2000);
}
function renderActiveDecor() {
    if (!decorContainer) return;
    decorContainer.innerHTML = '';
    const active = gameState.pet.activeDecor || [];
    const positions = [
        { bottom: '15%', left: '8%' },
        { bottom: '15%', right: '8%' },
        { top: '25%', right: '8%' },
    ];
    active.forEach((decorId, index) => {
        const item = DECOR_ITEMS.find(d => d.id === decorId);
        if (!item) return;
        const el = document.createElement('div');
        el.className = 'decor-item ' + (item.cssClass || '');
        el.textContent = item.emoji || item.name;
        el.style.position = 'absolute';
        if (positions[index]) Object.assign(el.style, positions[index]);
        el.title = item.name;
        if (decorId === 'fire') {
            el.style.cursor = 'pointer';
            el.addEventListener('click', (e) => { e.stopPropagation(); onFireClick(); });
            const canvas = document.createElement('canvas');
            canvas.width = 60; canvas.height = 60;
            canvas.style.cssText = 'position:absolute;top:-10px;left:-10px;pointer-events:none;z-index:10;';
            el.parentElement.appendChild(canvas);
            animateFire(canvas);
        }
        decorContainer.appendChild(el);
    });
}
function renderHomeShop() {
    if (!homeShopList) return;
    homeShopList.innerHTML = '';
    const homesSection = document.createElement('div');
    homesSection.className = 'shop-section';
    homesSection.innerHTML = '<div class="shop-section-title">🏠 Дома</div>';
    Object.entries(HOMES).forEach(([id, home]) => {
        if (id === 'basic') return;
        if (home.biome !== 'all' && home.biome !== gameState.pet.biome) return;
        const card = document.createElement('div');
        card.className = 'shop-item';
        const canAfford = gameState.pet.coins >= home.cost && gameState.pet.home !== id;
        if (!canAfford && gameState.pet.home !== id) card.classList.add('locked');
        const extra = gameState.pet.home === id ? ' (текущий)' : '';
        card.innerHTML = `<div class="shop-item-name">${home.emoji} ${home.name}</div><div class="shop-item-desc">${home.biome === 'all' ? 'Для всех' : 'Для ' + home.biome}${extra}</div><div class="shop-item-cost">🪙 ${home.cost}</div>`;
        card.addEventListener('click', () => { if (canAfford) upgradeHome(id); });
        homesSection.appendChild(card);
    });
    homeShopList.appendChild(homesSection);
    const decorSection = document.createElement('div');
    decorSection.className = 'shop-section';
    decorSection.innerHTML = '<div class="shop-section-title">🎀 Декор</div>';
    DECOR_ITEMS.forEach(item => {
        const owned = gameState.pet.decor.includes(item.id);
        const active = (gameState.pet.activeDecor || []).includes(item.id);
        const status = owned ? (active ? ' ✅' : ' ✔️') : '';
        const card = document.createElement('div');
        card.className = 'shop-item';
        const canBuy = gameState.pet.coins >= item.cost && !owned;
        if (!canBuy && !owned) card.classList.add('locked');
        card.innerHTML = `<div class="shop-item-name">${item.name}${status}</div><div class="shop-item-desc">${item.desc} ${owned ? (active ? 'активен' : 'на складе') : ''}</div><div class="shop-item-cost">🪙 ${item.cost}</div>`;
        card.addEventListener('click', () => {
            if (owned) toggleDecorActive(item.id);
            else if (canBuy) buyDecor(item.id);
        });
        decorSection.appendChild(card);
    });
    homeShopList.appendChild(decorSection);
}
function buyDecor(decorId) {
    const item = DECOR_ITEMS.find(d => d.id === decorId);
    if (!item) return;
    if (gameState.pet.coins < item.cost) { showToast('Недостаточно монет!'); return; }
    if (gameState.pet.decor.includes(decorId)) { showToast('Уже куплено!'); return; }
    gameState.pet.coins -= item.cost;
    gameState.pet.decor.push(decorId);
    if (!gameState.pet.activeDecor) gameState.pet.activeDecor = [];
    if (gameState.pet.activeDecor.length < 3 && !gameState.pet.activeDecor.includes(decorId)) {
        gameState.pet.activeDecor.push(decorId);
    }
    updateCoinsDisplay();
    renderActiveDecor();
    renderHomeShop();
    playSound('buy');
    checkAchievement('decor_5');
    showToast(`Куплено: ${item.name}!`, 1500);
    saveState();
}
function toggleDecorActive(decorId) {
    if (!gameState.pet.activeDecor) gameState.pet.activeDecor = [];
    const idx = gameState.pet.activeDecor.indexOf(decorId);
    if (idx >= 0) gameState.pet.activeDecor.splice(idx, 1);
    else {
        if (gameState.pet.activeDecor.length >= 3) { showToast('Максимум 3 декора одновременно!'); return; }
        gameState.pet.activeDecor.push(decorId);
    }
    renderActiveDecor();
    renderHomeShop();
    saveState();
}

// ========== ВОЗРАСТ ==========
function checkAgeProgression() {
    const now = Date.now();
    if (!gameState.pet.lastAgeCheck) { gameState.pet.lastAgeCheck = now; return; }
    const elapsedDays = Math.floor((now - gameState.pet.lastAgeCheck) / DAY_MS);
    if (elapsedDays <= 0) return;
    gameState.pet.age += elapsedDays;
    gameState.pet.lastAgeCheck = now;
    updateStage();
    if (hudAge) hudAge.textContent = `День ${gameState.pet.age}`;
}
function updateStage() {
    const oldStage = gameState.pet.stage;
    if (gameState.pet.age >= STAGES.adult.minAge) gameState.pet.stage = 'adult';
    else if (gameState.pet.age >= STAGES.teen.minAge) gameState.pet.stage = 'teen';
    else gameState.pet.stage = 'baby';
    if (oldStage !== gameState.pet.stage) onStageChange(oldStage, gameState.pet.stage);
    updatePetAppearance();
    updateStageBadge();
    updateAquariumUI();
}
function onStageChange(from, to) {
    const stage = STAGES[to];
    showStageUpPopup(stage);
    addEvent('stage', `${gameState.pet.name} достиг стадии "${stage.name}"!`, '🎉');
    if (to === 'teen') gameState.pet.coins += 50;
    else if (to === 'adult') { gameState.pet.coins += 100; gameState.pet.mood = clamp(gameState.pet.mood + 20, 0, 100); }
    updateCoinsDisplay();
    updateWorkUI();
    playSound('stageUp');
    checkAchievement('adult');
    saveState();
}
function showStageUpPopup(stage) {
    const popup = document.createElement('div');
    popup.className = 'stage-popup';
    popup.innerHTML = `<div class="stage-popup-title">🎉 Твой питомец вырос!</div><div class="stage-popup-stage">${stage.name}</div>${stage.unlockWork ? '<div class="stage-popup-unlock">🔓 Открыт самостоятельный заработок!</div>' : ''}`;
    document.body.appendChild(popup);
    setTimeout(() => { popup.classList.add('fade-out'); setTimeout(() => popup.remove(), 500); }, 3000);
}
function updatePetAppearance() {
    const petId = gameState.pet.petId;
    const stage = gameState.pet.stage;
    const stageScale = STAGES[stage]?.spriteScale || 1;
    if (SPRITE_DATA[petId]) {
        let canvas = document.getElementById('pet-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'pet-canvas';
            canvas.width = 64; canvas.height = 64;
            const container = document.getElementById('pet-sprite');
            if (container) {
                container.innerHTML = '';
                container.appendChild(canvas);
                container.style.background = 'transparent';
                container.style.borderRadius = '0';
                container.style.width = 'auto';
                container.style.height = 'auto';
            }
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const size = 4 * stageScale;
        const offset = (64 - 16 * size) / 2;
        drawPixelSprite(ctx, petId, offset, offset, 4, stageScale);
        canvas.width = 64 * stageScale;
        canvas.height = 64 * stageScale;
        canvas.style.width = (64 * stageScale) + 'px';
        canvas.style.height = (64 * stageScale) + 'px';
        ctx.scale(stageScale, stageScale);
        ctx.clearRect(0, 0, canvas.width / stageScale, canvas.height / stageScale);
        drawPixelSprite(ctx, petId, 0, 0, 4, 1);
    } else {
        const petData = PETS[gameState.pet.biome]?.find(p => p.id === petId);
        const emoji = petData?.emoji || '❓';
        const suffix = STAGES[stage]?.emojiSuffix || '';
        const sprite = document.getElementById('pet-sprite');
        if (sprite) {
            sprite.textContent = emoji + suffix;
            sprite.style.transform = `scale(${stageScale})`;
            const canvas = document.getElementById('pet-canvas');
            if (canvas) canvas.remove();
        }
    }
}
function updateStageBadge() {
    const existing = document.getElementById('stage-badge');
    if (existing) existing.remove();
    const stage = STAGES[gameState.pet.stage];
    const badge = document.createElement('div');
    badge.id = 'stage-badge';
    badge.className = `stage-badge stage-${gameState.pet.stage}`;
    badge.textContent = stage.name;
    gameBg.appendChild(badge);
}

// ========== ПИКСЕЛЬНЫЙ СПРАЙТ ==========
function drawPixelSprite(ctx, spriteId, x, y, pixelSize = 4, scale = 1) {
    const data = SPRITE_DATA[spriteId];
    const palette = SPRITE_PALETTES[spriteId];
    if (!data || !palette) {
        ctx.font = `${pixelSize * scale * 4}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const petData = PETS[gameState.pet.biome]?.find(p => p.id === spriteId);
        ctx.fillText(petData?.emoji || '❓', x + pixelSize * 8 * scale, y + pixelSize * 8 * scale);
        return;
    }
    const size = pixelSize * scale;
    for (let row = 0; row < 16; row++) {
        const line = data[row];
        if (!line) continue;
        for (let col = 0; col < 16; col++) {
            const char = line[col];
            if (char === '_') continue;
            const color = palette[char];
            if (!color) continue;
            ctx.fillStyle = color;
            ctx.fillRect(x + col * size, y + row * size, size, size);
        }
    }
}

// ========== АНИМАЦИИ ПИТОМЦА ==========
const PET_ANIMATIONS = {
    redtail: {
        baseEmoji: '🦊',
        stages: { baby: { suffix: '👶', scale: 0.7 }, teen: { suffix: '🧒', scale: 0.9 }, adult: { suffix: '🧑', scale: 1.1 } },
        states: {
            idle: { frames: ['🦊'], interval: 0 },
            eating: { frames: ['🦊', '🦊🍗', '🦊🍗', '🦊'], interval: 300 },
            petting: { frames: ['🦊', '🦊❤️', '🦊❤️', '🦊'], interval: 250 },
            sleeping: { frames: ['🦊😴', '🦊😴', '🦊😴', '🦊😴'], interval: 800 },
            walking: { frames: ['🦊', '🦊🚶', '🦊', '🦊🚶'], interval: 350 },
            returning: { frames: ['🦊', '🦊🎒', '🦊🎒', '🦊'], interval: 400 }
        }
    }
};
let currentAnimation = null;
let animationTimeout = null;
window._isWalking = false;
function setPetAnimation(state, duration = 2000) {
    if (window._isWalking) return;
    const petId = gameState.pet.petId;
    const anim = PET_ANIMATIONS[petId];
    if (!anim) {
        const petData = PETS[gameState.pet.biome]?.find(p => p.id === petId);
        petSprite.textContent = petData ? petData.emoji : '❓';
        petSprite.style.transform = `scale(${STAGES[gameState.pet.stage].spriteScale})`;
        return;
    }
    const stage = gameState.pet.stage;
    const stageData = anim.stages[stage] || anim.stages.baby;
    const base = anim.baseEmoji;
    const suffix = stageData.suffix || '';
    const scale = stageData.scale || 1;
    const stateData = anim.states[state] || anim.states.idle;
    const frames = stateData.frames;
    const interval = stateData.interval || 0;
    if (animationTimeout) { clearInterval(animationTimeout); animationTimeout = null; }
    let frameIndex = 0;
    function showFrame(index) {
        let emoji = frames[index % frames.length];
        petSprite.textContent = emoji + suffix;
        petSprite.style.transform = `scale(${scale})`;
    }
    showFrame(0);
    if (interval > 0 && frames.length > 1) {
        animationTimeout = setInterval(() => {
            frameIndex = (frameIndex + 1) % frames.length;
            showFrame(frameIndex);
        }, interval);
    }
    if (state !== 'idle' && duration > 0) {
        clearTimeout(currentAnimation?.returnTimer);
        currentAnimation = { petId, state, frameIndex, timerId: animationTimeout };
        currentAnimation.returnTimer = setTimeout(() => { setPetAnimation('idle', 0); }, duration);
    } else { currentAnimation = { petId, state, frameIndex, timerId: animationTimeout }; }
}

// ========== МИМИКА ==========
function updateMoodExpression() {
    const pet = gameState.pet;
    let expression = 'neutral';
    if (pet.health < 20) expression = 'sick';
    else if (pet.energy < 30) expression = 'sleepy';
    else if (pet.hunger < 20 || pet.mood < 20) expression = 'sad';
    else if (pet.mood > 70 && pet.hunger > 50 && pet.energy > 50) expression = 'happy';
    gameState.pet.moodExpression = expression;
    const expr = EXPRESSIONS[expression];
    if (moodIndicator) {
        moodIndicator.textContent = expr.emoji;
        moodIndicator.className = 'mood-indicator mood-' + expression;
    }
}

// ========== СЕЗОНЫ ==========
function initSeason() {
    if (!gameState.season.weekStart) {
        gameState.season.weekStart = Date.now();
        gameState.season.current = getSeasonByDate(new Date());
        gameState.season.event = null;
        gameState.season.eventEnd = null;
    }
}
function getSeasonByDate(date) {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}
function updateSeason() {
    const now = Date.now();
    if (now - gameState.season.weekStart >= WEEK_MS) { rotateSeason(); gameState.season.weekStart = now; }
    if (gameState.season.event && gameState.season.eventEnd && now >= gameState.season.eventEnd) { endEvent(); }
    else if (!gameState.season.event) { tryStartEvent(now); }
}
function rotateSeason() {
    const order = ['spring', 'summer', 'autumn', 'winter'];
    const idx = order.indexOf(gameState.season.current);
    gameState.season.current = order[(idx + 1) % 4];
    endEvent(true);
    const season = SEASONS[gameState.season.current];
    showWalkResult(`Наступила ${season.emoji} ${season.name}!`);
    addEvent('season', `Наступил сезон: ${season.emoji} ${season.name}`, '🌿');
    updateSeasonUI();
}
function tryStartEvent(now) {
    if (Math.random() > 0.10) return;
    if (gameState.season.lastEventEnd && (now - gameState.season.lastEventEnd) < EVENT_COOLDOWN) return;
    const available = SEASON_EVENTS.filter(e => e.seasons.includes(gameState.season.current));
    if (!available.length) return;
    const event = available[Math.floor(Math.random() * available.length)];
    gameState.season.event = event;
    gameState.season.eventEnd = now + event.duration;
    updateEventUI();
    playSound('eventStart');
    showWalkResult(`${event.emoji} ${event.name}! ${event.desc}`);
    startWeatherEffect(event);
}
function endEvent(silent = false) {
    if (!gameState.season.event) return;
    if (!silent) showWalkResult(`Событие "${gameState.season.event.name}" закончилось`);
    gameState.season.lastEventEnd = Date.now();
    gameState.season.event = null;
    gameState.season.eventEnd = null;
    updateEventUI();
    stopWeather();
    updateSky();
}
function updateSeasonUI() {
    if (!seasonIndicator) return;
    const season = SEASONS[gameState.season.current];
    seasonIndicator.textContent = `${season.emoji} ${season.name}`;
}
function updateEventUI() {
    if (!eventBanner) return;
    if (gameState.season.event) {
        eventBanner.classList.add('active');
        eventBanner.textContent = `${gameState.season.event.emoji} ${gameState.season.event.name}`;
    } else { eventBanner.classList.remove('active'); eventBanner.textContent = ''; }
}
function getEffectiveDecay() {
    const base = { ...PASSIVE_DECAY };
    const season = SEASONS[gameState.season.current];
    if (season.passiveMod) {
        for (const [stat, mod] of Object.entries(season.passiveMod)) {
            if (base[stat] !== undefined) base[stat] += mod;
        }
    }
    if (gameState.season.event) {
        for (const [stat, mod] of Object.entries(gameState.season.event.effect)) {
            if (base[stat] !== undefined) base[stat] += mod;
        }
    }
    if (gameState._nightBonus && base.energy) base.energy = Math.max(0, base.energy - 0.3);
    const hasFire = gameState.pet.activeDecor && gameState.pet.activeDecor.includes('fire');
    const isCold = (gameState.season.current === 'winter') || (gameState.season.event && ['Метель', 'Похолодание'].includes(gameState.season.event.name));
    if (hasFire && isCold) {
        if (base.energy) base.energy = Math.max(0, base.energy - 0.3);
        if (base.mood) base.mood = Math.max(0, base.mood - 0.2);
        gameState.pet.mood = clamp(gameState.pet.mood + 0.1, 0, 100);
    }
    if (gameState.pet.homeDurability <= 0) {
        if (base.energy) base.energy += 0.3;
        if (base.mood) base.mood += 0.2;
        if (base.hunger) base.hunger += 0.1;
    }
    for (const key of Object.keys(base)) base[key] = Math.max(0, base[key]);
    return base;
}

// ========== ПОГОДА ==========
let weatherParticles = [], weatherCanvas = null, weatherCtx = null, weatherAnimationId = null, isWeatherActive = false;
function initWeatherCanvas() {
    weatherCanvas = document.getElementById('weather-canvas');
    if (!weatherCanvas) return;
    weatherCtx = weatherCanvas.getContext('2d');
    resizeWeatherCanvas();
    window.addEventListener('resize', resizeWeatherCanvas);
}
function resizeWeatherCanvas() {
    if (!weatherCanvas) return;
    weatherCanvas.width = weatherCanvas.parentElement.offsetWidth;
    weatherCanvas.height = weatherCanvas.parentElement.offsetHeight;
}
function startWeatherEffect(event) {
    const name = event.name;
    if (name === 'Ливень') startRain();
    else if (name === 'Метель') startBlizzard();
    else if (name === 'Засуха') startDrought();
    else if (name === 'Похолодание') startSnow();
    else stopWeather();
    updateSky();
}
function startRain() {
    stopWeather();
    isWeatherActive = true;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 60 : 150;
    weatherParticles = [];
    for (let i = 0; i < count; i++) {
        weatherParticles.push({ x: Math.random() * weatherCanvas.width, y: Math.random() * weatherCanvas.height, speed: 5 + Math.random() * 10, length: 10 + Math.random() * 15, opacity: 0.2 + Math.random() * 0.3 });
    }
    weatherCanvas.classList.add('active');
    animateWeather('rain');
}
function startSnow() {
    stopWeather();
    isWeatherActive = true;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 50 : 120;
    weatherParticles = [];
    for (let i = 0; i < count; i++) {
        weatherParticles.push({ x: Math.random() * weatherCanvas.width, y: Math.random() * weatherCanvas.height, speed: 0.5 + Math.random() * 1.5, size: 2 + Math.random() * 5, drift: (Math.random() - 0.5) * 0.5, opacity: 0.6 + Math.random() * 0.4 });
    }
    weatherCanvas.classList.add('active');
    animateWeather('snow');
}
function startBlizzard() {
    stopWeather();
    isWeatherActive = true;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 80 : 200;
    weatherParticles = [];
    for (let i = 0; i < count; i++) {
        weatherParticles.push({ x: Math.random() * weatherCanvas.width, y: Math.random() * weatherCanvas.height, speed: 2 + Math.random() * 4, size: 1 + Math.random() * 3, drift: -2 + Math.random() * -3, opacity: 0.5 + Math.random() * 0.5 });
    }
    weatherCanvas.classList.add('active');
    animateWeather('blizzard');
}
function startDrought() {
    stopWeather();
    isWeatherActive = true;
    const bg = document.getElementById('game-background');
    bg.classList.add('drought-effect');
    weatherCanvas.classList.add('active');
    animateWeather('drought');
}
function stopWeather() {
    isWeatherActive = false;
    if (weatherAnimationId) { cancelAnimationFrame(weatherAnimationId); weatherAnimationId = null; }
    const bg = document.getElementById('game-background');
    bg.classList.remove('drought-effect');
    if (weatherCanvas) { weatherCanvas.classList.remove('active'); if (weatherCtx) weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height); }
    weatherParticles = [];
}
function animateWeather(type) {
    if (!isWeatherActive) return;
    if (document.hidden) { weatherAnimationId = requestAnimationFrame(() => animateWeather(type)); return; }
    if (!weatherCtx) return;
    const ctx = weatherCtx, w = weatherCanvas.width, h = weatherCanvas.height;
    ctx.clearRect(0, 0, w, h);
    if (type === 'rain') {
        ctx.strokeStyle = 'rgba(180, 210, 255, 0.6)';
        ctx.lineWidth = 1;
        weatherParticles.forEach(p => {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.length * 0.3, p.y + p.length); ctx.stroke();
            p.y += p.speed; p.x -= p.speed * 0.2;
            if (p.y > h) { p.y = -p.length; p.x = Math.random() * w; }
        });
    } else if (type === 'snow' || type === 'blizzard') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        weatherParticles.forEach(p => {
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
            p.y += p.speed; p.x += p.drift + (type === 'blizzard' ? -2 : 0);
            if (p.y > h) { p.y = -p.size; p.x = Math.random() * w; }
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        });
    } else if (type === 'drought') {
        ctx.strokeStyle = 'rgba(255, 200, 100, 0.15)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            const y = 20 + i * 30 + Math.sin(Date.now() / 1000 + i) * 5;
            ctx.moveTo(0, y);
            for (let x = 0; x < w; x += 5) ctx.lineTo(x, y + Math.sin(x / 30 + Date.now() / 800 + i) * 8);
            ctx.stroke();
        }
    }
    weatherAnimationId = requestAnimationFrame(() => animateWeather(type));
}

// ========== ДЕНЬ/НОЧЬ ==========
function updateSky() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    let skyClass = 'sky-day', sunClass = 'sun', top = 15, left = 50;
    if (hours >= 5 && hours < 7) { skyClass = 'sky-dawn'; sunClass = 'sun'; top = 15 + (hours - 5) * 5; left = 30 + (hours - 5) * 10; }
    else if (hours >= 7 && hours < 17) { skyClass = 'sky-day'; sunClass = 'sun'; top = 15 + 35 * Math.sin((hours - 7) / 10 * Math.PI); left = 10 + 40 * Math.sin((hours - 7) / 10 * Math.PI * 0.5); }
    else if (hours >= 17 && hours < 19) { skyClass = 'sky-dusk'; sunClass = 'sun'; top = 50 - (hours - 17) * 10; left = 50 - (hours - 17) * 10; }
    else if (hours >= 19 && hours < 23) { skyClass = 'sky-night'; sunClass = 'moon'; top = 15 + (hours - 19) * 3; left = 30 + (hours - 19) * 5; }
    else { skyClass = 'sky-midnight'; sunClass = 'moon'; top = 30; left = 50; }
    const container = document.getElementById('sky-container');
    if (container) container.className = skyClass;
    const sunMoon = document.getElementById('sun-moon');
    if (sunMoon) {
        sunMoon.className = sunClass;
        sunMoon.style.top = top + '%';
        sunMoon.style.left = left + '%';
        const event = gameState.season?.event;
        const badWeather = event && ['Ливень', 'Метель', 'Похолодание'].includes(event.name);
        sunMoon.style.opacity = badWeather ? '0' : '1';
    }
    const nightOverlay = document.getElementById('night-overlay');
    if (nightOverlay) {
        if (hours >= 19 || hours < 5) nightOverlay.classList.add('active');
        else nightOverlay.classList.remove('active');
    }
}

// ========== ПРОГУЛКА ==========
function startWalk() {
    if (gameState.walk.active) return;
    if (gameState.pet.energy < 10) { showToast('Питомец слишком устал! (энергия < 10)'); return; }
    if (gameState.pet.biome === 'aquatic' && !gameState.pet.isOpenSea) { showToast('Питомец в аквариуме. Открой море, чтобы гулять!'); return; }
    disableActions(true);
    animateWalkAway();
    setTimeout(() => {
        gameState.walk.active = true;
        gameState.walk.startTime = Date.now();
        gameState.walk.duration = WALK_DURATION;
        gameState.pet.energy = clamp(gameState.pet.energy - 10, 0, 100);
        recalcHealth();
        updateStatBars();
        updateWalkUI();
        playSound('walk');
        saveState();
        disableActions(false);
        btnWalk.disabled = true;
    }, 5000);
}
function completeWalk() {
    gameState.walk.active = false;
    gameState.walk.startTime = null;
    const biome = gameState.pet.biome;
    const table = LOOT_TABLES[biome] || LOOT_TABLES.forest;
    const loot = rollLoot(table);
    gameState.pet.inventory.push(loot);
    gameState.pet.mood = clamp(gameState.pet.mood + 10, 0, 100);
    gameState.pet.hunger = clamp(gameState.pet.hunger - 5, 0, 100);
    gameState.pet.coins += WALK_INCOME_BONUS;
    gameState.walkCount = (gameState.walkCount || 0) + 1;
    recalcHealth();
    updateStatBars();
    updateCoinsDisplay();
    updateWalkUI();
    changeAffection(2);
    if (!(gameState.pet.biome === 'aquatic' && !gameState.pet.isOpenSea)) {
        if (Math.random() < 0.20) {
            const injuryTypes = ['burn', 'cut', 'fracture'];
            const injury = injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
            applyInjury(injury);
        }
    }
    if (loot.rarity === 'rare' || loot.rarity === 'epic') {
        addEvent('find', `Найден редкий предмет: ${loot.emoji} ${loot.name} (${loot.rarity})`, '✨');
    }
    animateWalkBack(loot);
    checkAchievement('first_walk');
    checkAchievement('walk_10');
    const lootDisplay = loot.emoji + ' ' + loot.name;
    showWalkResult(`Прогулка завершена! Найдено: ${lootDisplay}`);
    setTimeout(() => { btnWalk.disabled = false; }, 5000);
    saveState();
}
function rollLoot(table) {
    const totalWeight = table.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const entry of table) {
        roll -= entry.weight;
        if (roll <= 0) { const { weight, ...item } = entry; return { ...item }; }
    }
    const { weight, ...first } = table[0];
    return { ...first };
}
function animateWalkAway() {
    const pet = document.getElementById('pet-sprite');
    if (!pet) return;
    pet.classList.remove('pet-returning', 'pet-walking');
    void pet.offsetWidth;
    pet.classList.add('pet-walking');
    setTimeout(() => {
        pet.style.display = 'none';
        const overlay = document.getElementById('walk-overlay');
        if (overlay) overlay.classList.add('active');
    }, 5000);
}
function animateWalkBack(loot) {
    const pet = document.getElementById('pet-sprite');
    if (!pet) return;
    const overlay = document.getElementById('walk-overlay');
    if (overlay) overlay.classList.remove('active');
    pet.style.display = '';
    pet.classList.remove('pet-walking', 'pet-returning');
    void pet.offsetWidth;
    pet.classList.add('pet-returning');
    const petId = gameState.pet.petId;
    const anim = PET_ANIMATIONS[petId];
    const baseEmoji = anim ? anim.baseEmoji : '❓';
    const stage = STAGES[gameState.pet.stage];
    const suffix = stage.emojiSuffix || '';
    const lootEmoji = loot.match(/\p{Emoji}/gu)?.[0] || '🎒';
    pet.textContent = baseEmoji + suffix + ' ' + lootEmoji;
    setTimeout(() => {
        pet.textContent = baseEmoji + suffix + ' 👃';
        pet.style.transition = 'transform 0.3s ease';
        pet.style.transform = 'scale(1.1) translateY(-4px)';
        setTimeout(() => {
            pet.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => {
                pet.classList.remove('pet-returning');
                updatePetAppearance();
                renderInventory();
                spawnFloatingEmojis('🎉', 12, 1800);
            }, 500);
        }, 1500);
    }, 4000);
}
function updateWalkUI() {
    if (gameState.walk.active) {
        btnWalk.disabled = true;
        walkOverlay.style.display = 'block';
        walkOverlay.classList.add('active');
    } else {
        btnWalk.disabled = false;
        walkOverlay.style.display = 'none';
        walkOverlay.classList.remove('active');
        if (walkTimer) walkTimer.textContent = '';
    }
    updateAquariumUI();
}
function updateWalkTimer() {
    if (!gameState.walk.active || !gameState.walk.startTime) return;
    const elapsed = Date.now() - gameState.walk.startTime;
    const remaining = Math.max(0, gameState.walk.duration - elapsed);
    if (remaining <= 0) { completeWalk(); return; }
    if (walkTimer) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        walkTimer.textContent = `Гуляет... ${minutes}:${String(seconds).padStart(2, '0')}`;
    }
}

// ========== РАБОТА ==========
function startWork() {
    if (gameState.pet.stage !== 'adult') { showToast('Только взрослый питомец может работать!'); return; }
    if (gameState.work.active) return;
    if (gameState.pet.energy < 15) { showToast('Слишком устал! (энергия < 15)'); return; }
    const pet = document.getElementById('pet-sprite');
    if (pet) {
        pet.classList.add('pet-working');
        const effects = document.createElement('div');
        effects.className = 'work-effects';
        effects.id = 'work-effects';
        pet.parentElement.appendChild(effects);
    }
    gameState.work.active = true;
    gameState.work.startTime = Date.now();
    gameState.work.duration = WORK_DURATION;
    gameState.pet.energy = clamp(gameState.pet.energy - 15, 0, 100);
    updateStatBars();
    updateWorkUI();
    saveState();
}
function completeWork() {
    gameState.work.active = false;
    gameState.work.startTime = null;
    gameState.pet.coins += WORK_REWARD;
    gameState.pet.hunger = clamp(gameState.pet.hunger - 10, 0, 100);
    gameState.pet.mood = clamp(gameState.pet.mood - 5, 0, 100);
    recalcHealth();
    updateStatBars();
    updateCoinsDisplay();
    updateWorkUI();
    checkAchievement('rich_500');
    checkAchievement('all_stats_100');
    showWalkResult(`Заработано: 🪙 ${WORK_REWARD}`);
    const pet = document.getElementById('pet-sprite');
    if (pet) {
        pet.classList.remove('pet-working');
        const effects = document.getElementById('work-effects');
        if (effects) effects.remove();
    }
    saveState();
}
function updateWorkUI() {
    if (gameState.work.active) {
        workOverlay.style.display = 'block';
        workOverlay.classList.add('active');
        btnWork.disabled = true;
    } else {
        workOverlay.style.display = 'none';
        workOverlay.classList.remove('active');
        btnWork.disabled = false;
        if (workTimer) workTimer.textContent = '';
    }
    btnWork.style.display = (gameState.pet.stage === 'adult') ? '' : 'none';
    updateAquariumUI();
}
function updateWorkTimer() {
    if (!gameState.work.active || !gameState.work.startTime) return;
    const elapsed = Date.now() - gameState.work.startTime;
    const remaining = Math.max(0, gameState.work.duration - elapsed);
    if (remaining <= 0) { completeWork(); return; }
    if (workTimer) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        workTimer.textContent = `Работает... ${minutes}:${String(seconds).padStart(2, '0')}`;
    }
}

// ========== МОРСКИЕ ПИТОМЦЫ ==========
function updateAquariumUI() {
    const isAquatic = gameState.pet.biome === 'aquatic';
    const isAdult = gameState.pet.stage === 'adult';
    const isOpenSea = gameState.pet.isOpenSea || false;
    if (isAquatic && !isOpenSea) {
        btnWalk.style.display = 'none';
        btnGoSea.style.display = isAdult ? '' : 'none';
        btnWork.style.display = 'none';
    } else {
        btnWalk.style.display = '';
        btnGoSea.style.display = 'none';
        btnWork.style.display = (gameState.pet.stage === 'adult') ? '' : 'none';
    }
}
function goToOpenSea() {
    if (gameState.pet.biome !== 'aquatic') return;
    if (gameState.pet.isOpenSea) return;
    if (gameState.pet.stage !== 'adult') { showToast('Только взрослый питомец может отправиться в открытое море!'); return; }
    const cost = 500;
    if (gameState.pet.coins < cost) { showToast(`Недостаточно монет! Нужно ${cost} 🪙`); return; }
    gameState.pet.coins -= cost;
    gameState.pet.isOpenSea = true;
    updateCoinsDisplay();
    updateAquariumUI();
    playSound('buy');
    showToast('🌊 Питомец отправился в открытое море! Теперь он может гулять.', 3000);
    gameState.pet.mood = clamp(gameState.pet.mood + 15, 0, 100);
    updateStatBars();
    saveState();
}

// ========== ДЕЙСТВИЯ ПИТОМЦА ==========
function petPet() {
    if (Date.now() - lastActionTime < ACTION_COOLDOWN) return;
    lastActionTime = Date.now();
    if (gameState.walk.active || gameState.work.active) { showToast('Питомец занят!'); return; }
    const petId = gameState.pet.petId;
    const anim = PET_ANIMATIONS[petId];
    if (anim && anim.states.petting) {
        setPetAnimation('petting', 1500);
        spawnFloatingEmojis('❤️', 12, 1800);
        setTimeout(() => {
            gameState.pet.mood = clamp(gameState.pet.mood + 15, 0, 100);
            gameState.pet.hunger = clamp(gameState.pet.hunger - 2, 0, 100);
            recalcHealth();
            updateStatBars();
            changeAffection(3);
            playSound('pet');
            saveState();
            setPetAnimation('idle', 0);
        }, 1500);
    } else {
        gameState.pet.mood = clamp(gameState.pet.mood + 15, 0, 100);
        gameState.pet.hunger = clamp(gameState.pet.hunger - 2, 0, 100);
        recalcHealth();
        updateStatBars();
        changeAffection(3);
        playSound('pet');
        saveState();
    }
}
function sleepPet() {
    if (Date.now() - lastActionTime < ACTION_COOLDOWN) return;
    lastActionTime = Date.now();
    if (gameState.walk.active || gameState.work.active) { showToast('Питомец занят!'); return; }
    const petId = gameState.pet.petId;
    const anim = PET_ANIMATIONS[petId];
    if (anim && anim.states.sleeping) {
        setPetAnimation('sleeping', 2500);
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.3);pointer-events:none;z-index:10;transition:opacity 1s;opacity:0;';
        document.getElementById('game-background').appendChild(overlay);
        requestAnimationFrame(() => { overlay.style.opacity = '1'; });
        setTimeout(() => {
            gameState.pet.energy = clamp(gameState.pet.energy + 25, 0, 100);
            gameState.pet.hunger = clamp(gameState.pet.hunger - 5, 0, 100);
            gameState.pet.mood = clamp(gameState.pet.mood + 5, 0, 100);
            recalcHealth();
            updateStatBars();
            changeAffection(1);
            playSound('sleep');
            saveState();
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
            setPetAnimation('idle', 0);
        }, 2500);
    } else {
        gameState.pet.energy = clamp(gameState.pet.energy + 25, 0, 100);
        gameState.pet.hunger = clamp(gameState.pet.hunger - 5, 0, 100);
        gameState.pet.mood = clamp(gameState.pet.mood + 5, 0, 100);
        recalcHealth();
        updateStatBars();
        changeAffection(1);
        playSound('sleep');
        saveState();
    }
}

// ========== КОСТЁР ==========
function onFireClick() {
    const hasFire = gameState.pet.activeDecor && gameState.pet.activeDecor.includes('fire');
    if (!hasFire) { showToast('У вас нет активного костра!'); return; }
    const cookableItems = [];
    for (const [foodId, entries] of Object.entries(gameState.pet.food)) {
        const summary = getFoodSummary(foodId);
        if (summary.totalAmount > 0 && summary.minFreshness > 0 && COOKABLE_FOOD.includes(foodId)) {
            const food = FOOD_TYPES.find(f => f.id === foodId);
            if (food) cookableItems.push(food);
        }
    }
    if (cookableItems.length === 0) { showToast('Нет свежей еды для готовки!'); return; }
    openCookMenu(cookableItems);
}
function openCookMenu(items) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:80;';
    const modal = document.createElement('div');
    modal.style.cssText = 'background:#2a2a4a;padding:20px;border-radius:16px;border:2px solid #ffd700;max-width:300px;width:90%;color:#fff;text-align:center;';
    modal.innerHTML = `<div style="font-size:20px;font-weight:bold;margin-bottom:12px;">🔥 Приготовить еду</div>`;
    items.forEach(food => {
        const btn = document.createElement('button');
        btn.style.cssText = 'display:block;width:100%;padding:10px;margin:4px 0;background:#3a3a5a;border:1px solid #555;border-radius:8px;color:#fff;cursor:pointer;';
        btn.textContent = `${food.emoji} ${food.name}`;
        btn.addEventListener('click', () => { overlay.remove(); startCooking(food.id); });
        modal.appendChild(btn);
    });
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Отмена';
    cancelBtn.style.cssText = 'display:block;width:100%;padding:10px;margin-top:12px;background:#555;border:none;border-radius:8px;color:#fff;cursor:pointer;';
    cancelBtn.addEventListener('click', () => overlay.remove());
    modal.appendChild(cancelBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
function startCooking(foodId) {
    const food = FOOD_TYPES.find(f => f.id === foodId);
    if (!food) return;
    const summary = getFoodSummary(foodId);
    if (summary.totalAmount <= 0 || summary.minFreshness <= 0) { showToast('Недостаточно свежей еды!'); return; }
    const freshItem = getFreshFoodItem(foodId);
    if (!freshItem) { showToast('Нет свежей еды!'); return; }
    freshItem.entry.amount -= 1;
    if (freshItem.entry.amount <= 0) gameState.pet.food[foodId].splice(freshItem.index, 1);
    showToast(`Начинаем готовить ${food.name}...`, 1500);
    setTimeout(() => {
        const cookedId = `cooked_${foodId}`;
        if (!gameState.pet.food[cookedId]) gameState.pet.food[cookedId] = [];
        gameState.pet.food[cookedId].push({ amount: 1, freshness: 100 });
        gameState.pet.mood = clamp(gameState.pet.mood + 5, 0, 100);
        gameState.pet.energy = clamp(gameState.pet.energy + 5, 0, 100);
        updateStatBars();
        renderInventory();
        saveState();
        addEvent('cook', `Приготовлена ${food.name}`, '🔥');
        showToast(`✅ ${food.name} приготовлено! +${food.effects.mood + 5} к настроению`, 2000);
    }, COOK_DURATION);
}
function animateFire(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    function drawFlame() {
        ctx.clearRect(0, 0, w, h);
        const time = Date.now() / 200;
        const colors = ['#ff4500', '#ff8c00', '#ffd700', '#ff6347'];
        for (let i = 0; i < 5; i++) {
            const x = w/2 + Math.sin(time + i * 1.5) * 10;
            const y = h * 0.8 - i * 6;
            const radius = 8 + Math.sin(time * 2 + i) * 3;
            const alpha = 0.6 + Math.sin(time + i) * 0.3;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI*2);
            ctx.fillStyle = colors[i % colors.length];
            ctx.globalAlpha = alpha;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        for (let i = 0; i < 3; i++) {
            const x = w/2 + Math.sin(time * 3 + i * 2) * 15;
            const y = h * 0.3 + Math.sin(time * 2 + i * 1.7) * 10;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI*2);
            ctx.fillStyle = '#ffd700';
            ctx.globalAlpha = 0.8;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawFlame);
    }
    drawFlame();
}

// ========== ПОБЕГ ==========
function getHungerStrikeDays() {
    if (!gameState.pet.lastFeedTime) return 0;
    const now = Date.now();
    const diffMs = now - gameState.pet.lastFeedTime;
    return diffMs / DAY_MS;
}
function updateRunawayWarning(hungerDays) {
    const petArea = document.getElementById('pet-area');
    if (!petArea) return;
    const oldWarning = document.getElementById('runaway-warning');
    if (oldWarning) oldWarning.remove();
    if (hungerDays > HUNGER_STRIKE_DAYS_FOR_RUNAWAY && !gameState.pet.runaway) {
        const severity = Math.min((hungerDays - HUNGER_STRIKE_DAYS_FOR_RUNAWAY) / 1, 1);
        if (severity > 0.2) {
            const warning = document.createElement('div');
            warning.id = 'runaway-warning';
            warning.className = 'runaway-warning';
            const emoji = severity > 0.6 ? '😰' : '😟';
            warning.textContent = emoji;
            warning.title = `Голод ${Math.round(hungerDays)} дней. Риск побега: ${Math.round(severity * 100)}%`;
            warning.style.cssText = 'position:absolute;top:-30px;right:-20px;font-size:28px;z-index:8;animation:pulseWarning 1s ease-in-out infinite;';
            petArea.appendChild(warning);
        }
    }
}
function triggerRunaway(reason) {
    if (gameState.pet.runaway) return;
    if (reason === 'hunger') {
        const event = gameState.season?.event;
        const extremeWeather = event && ['Ливень', 'Метель', 'Засуха', 'Похолодание'].includes(event.name);
        if (extremeWeather) {
            addEvent('weather_shelter', `${gameState.pet.name} боится уходить в непогоду`, '🌧️');
            showToast('Питомец боится уходить в такую погоду!', 2000);
            return;
        }
    }
    gameState.pet.runaway = true;
    gameState.pet.runawayAttempts = (gameState.pet.runawayAttempts || 0) + 1;
    if (gameState.walk.active) completeWalk();
    if (gameState.work.active) completeWork();
    addEvent('runaway', `${gameState.pet.name} сбежал${reason === 'hunger' ? ' из-за голода' : ''}`, '🏃');
    showRunawayScreen(reason);
    saveState();
}
function showRunawayScreen(reason) {
    const overlay = document.createElement('div');
    overlay.id = 'runaway-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100;padding:20px;color:#fff;text-align:center;';
    const msg = reason === 'death' ? '💀 Твой питомец погиб от голода...' : '😢 Твой питомец не выдержал голода и сбежал искать еду сам...';
    overlay.innerHTML = `
        <div style="font-size:48px;margin-bottom:16px;">${reason === 'death' ? '💀' : '🏃'}</div>
        <div style="font-size:22px;font-weight:bold;margin-bottom:12px;">${msg}</div>
        <div style="font-size:16px;color:#aaa;margin-bottom:24px;">${reason === 'death' ? 'Питомец не вернётся.' : 'Ты можешь попытаться найти его, но это будет непросто...'}</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
            <button id="runaway-search-btn" style="padding:14px 28px;background:#4a90d9;border:none;border-radius:10px;color:#fff;font-size:18px;font-weight:bold;cursor:pointer;">🔍 Искать питомца</button>
            <button id="runaway-new-btn" style="padding:14px 28px;background:#d94a4a;border:none;border-radius:10px;color:#fff;font-size:18px;font-weight:bold;cursor:pointer;">🆕 Завести нового</button>
        </div>
        ${reason === 'death' ? '<div style="margin-top:20px;font-size:14px;color:#888;">(Вы можете завести нового питомца)</div>' : ''}
    `;
    document.body.appendChild(overlay);
    document.getElementById('runaway-search-btn').addEventListener('click', () => {
        if (reason === 'death') { showToast('Питомец погиб, поиск невозможен.'); return; }
        startSearch();
    });
    document.getElementById('runaway-new-btn').addEventListener('click', resetGame);
}
function startSearch() {
    const overlay = document.getElementById('runaway-overlay');
    if (!overlay) return;
    overlay.innerHTML = `
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <div style="font-size:22px;font-weight:bold;margin-bottom:12px;">Ищем питомца...</div>
        <div style="font-size:16px;color:#aaa;margin-bottom:20px;">Пожалуйста, подожди, это может занять некоторое время.</div>
        <div style="width:200px;height:6px;background:#333;border-radius:3px;overflow:hidden;">
            <div id="search-bar" style="width:0%;height:100%;background:#ffd700;transition:width 0.3s;"></div>
        </div>
        <div id="search-status" style="margin-top:12px;font-size:14px;color:#ccc;">Идёт поиск...</div>
    `;
    gameState.pet.searchActive = true;
    gameState.pet.searchStartTime = Date.now();
    const searchInterval = setInterval(() => {
        const elapsed = Date.now() - gameState.pet.searchStartTime;
        const progress = Math.min(elapsed / SEARCH_DURATION, 1);
        const bar = document.getElementById('search-bar');
        if (bar) bar.style.width = (progress * 100) + '%';
        if (progress >= 1) { clearInterval(searchInterval); finishSearch(); }
    }, 100);
    saveState();
}
function finishSearch() {
    gameState.pet.searchActive = false;
    const success = Math.random() < SEARCH_SUCCESS_CHANCE;
    const overlay = document.getElementById('runaway-overlay');
    if (!overlay) return;
    if (success) {
        gameState.pet.runaway = false;
        gameState.pet.age += RUNAWAY_AGE_BONUS;
        const currentMax = gameState.pet.affectionMax || 100;
        gameState.pet.affectionMax = Math.max(20, currentMax - 20);
        gameState.pet.affection = Math.min(gameState.pet.affection || 50, gameState.pet.affectionMax);
        gameState.pet.lastFeedTime = Date.now();
        gameState.pet.hunger = clamp(gameState.pet.hunger + 20, 0, 100);
        gameState.pet.mood = clamp(gameState.pet.mood - 10, 0, 100);
        addEvent('return', `${gameState.pet.name} вернулся после побега (постарел на ${RUNAWAY_AGE_BONUS} дн.)`, '🕊️');
        saveState();
        overlay.innerHTML = `
            <div style="font-size:48px;margin-bottom:16px;">🎉</div>
            <div style="font-size:22px;font-weight:bold;margin-bottom:12px;">Питомец найден!</div>
            <div style="font-size:16px;color:#aaa;margin-bottom:8px;">Он вернулся, но стал старше и немного отстранённее.</div>
            <div style="font-size:14px;color:#ffd700;margin-bottom:16px;">+${RUNAWAY_AGE_BONUS} дней к возрасту, привязанность снижена до ${Math.round(gameState.pet.affectionMax)}%.</div>
            <button id="runaway-close-btn" style="padding:12px 24px;background:#4a90d9;border:none;border-radius:8px;color:#fff;font-size:16px;cursor:pointer;">Продолжить игру</button>
        `;
        document.getElementById('runaway-close-btn').addEventListener('click', () => {
            overlay.remove();
            updateStatBars();
            updateAffectionUI();
            updateMoodExpression();
            updatePetAppearance();
            checkAgeProgression();
        });
    } else {
        overlay.innerHTML = `
            <div style="font-size:48px;margin-bottom:16px;">😔</div>
            <div style="font-size:22px;font-weight:bold;margin-bottom:12px;">Не удалось найти питомца...</div>
            <div style="font-size:16px;color:#aaa;margin-bottom:16px;">Похоже, он ушёл навсегда. Ты можешь завести нового питомца.</div>
            <button id="runaway-new-btn2" style="padding:12px 24px;background:#d94a4a;border:none;border-radius:8px;color:#fff;font-size:16px;cursor:pointer;">Завести нового</button>
        `;
        document.getElementById('runaway-new-btn2').addEventListener('click', resetGame);
    }
}

// ========== ИНТЕРЬЕР ==========
function openInterior() {
    const overlay = document.getElementById('interior-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    renderShelves();
    renderInteriorWeather();
    renderInteriorDetails();
    document.body.style.overflow = 'hidden';
}
function closeInterior() {
    const overlay = document.getElementById('interior-overlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    if (interiorWeatherInterval) { clearInterval(interiorWeatherInterval); interiorWeatherInterval = null; }
    const canvas = document.getElementById('interior-weather-canvas');
    if (canvas) { const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); }
}
let interiorWeatherInterval = null;
function renderShelves() {
    const container = document.getElementById('interior-shelves');
    if (!container) return;
    const stage = gameState.pet.stage || 'baby';
    const maxShelves = SHELVES_BY_STAGE[stage] || 2;
    const activeDecor = gameState.pet.activeDecor || [];
    const validActive = activeDecor.filter(id => DECOR_ITEMS.some(d => d.id === id));
    while (validActive.length > maxShelves) {
        const removed = validActive.pop();
        const idx = gameState.pet.activeDecor.indexOf(removed);
        if (idx !== -1) gameState.pet.activeDecor.splice(idx, 1);
    }
    let slotsHtml = '';
    for (let i = 0; i < maxShelves; i++) {
        const decorId = validActive[i] || null;
        const item = decorId ? DECOR_ITEMS.find(d => d.id === decorId) : null;
        const filled = !!item;
        let starsHtml = '', rarityLabel = '';
        if (filled) {
            const rarity = item.rarity || 'common';
            const stars = { 'common':1, 'uncommon':2, 'rare':3, 'epic':4, 'legendary':5 }[rarity] || 1;
            rarityLabel = rarity;
            for (let s = 0; s < 5; s++) {
                let cls = 'star';
                if (s < stars) {
                    cls += ' filled';
                    if (stars >= 4) cls += ' glow-gold';
                    else if (stars >= 2) cls += ' glow-blue';
                }
                starsHtml += `<span class="${cls}">★</span>`;
            }
        } else {
            starsHtml = '<span style="color:#444;font-size:10px;">пусто</span>';
        }
        const emoji = filled ? item.emoji : '⬜';
        slotsHtml += `
            <div class="shelf-slot ${filled ? 'filled' : 'empty'}" data-index="${i}" data-decor-id="${decorId || ''}">
                <div class="shelf-item-emoji">${emoji}</div>
                ${filled ? `<div class="shelf-stars">${starsHtml}</div><div class="shelf-rarity-label">${rarityLabel}</div>` : `<div style="font-size:8px;color:#555;">слот ${i+1}</div>`}
            </div>
        `;
    }
    container.innerHTML = slotsHtml;
    container.querySelectorAll('.shelf-slot').forEach(slot => {
        slot.addEventListener('click', function(e) {
            const decorId = this.dataset.decorId;
            if (decorId) { removeDecorFromShelf(decorId); }
            else { const index = parseInt(this.dataset.index); openAddDecorMenu(index); }
        });
    });
}
function removeDecorFromShelf(decorId) {
    const idx = gameState.pet.activeDecor.indexOf(decorId);
    if (idx === -1) return;
    gameState.pet.activeDecor.splice(idx, 1);
    renderShelves();
    renderActiveDecor();
    saveState();
    showToast(`Украшение снято с полки`, 1500);
}
function openAddDecorMenu(slotIndex) {
    const available = gameState.pet.decor.filter(id => !gameState.pet.activeDecor.includes(id));
    if (available.length === 0) { showToast('Нет свободных украшений. Купите новые в магазине дома.', 2000); return; }
    const menu = document.createElement('div');
    menu.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#2a2a4a;padding:20px;border-radius:16px;border:2px solid #ffd700;z-index:70;max-width:300px;width:90%;max-height:60vh;overflow-y:auto;';
    menu.innerHTML = `<div style="text-align:center;color:#ffd700;font-weight:bold;margin-bottom:12px;">Выберите украшение</div>`;
    available.forEach(id => {
        const item = DECOR_ITEMS.find(d => d.id === id);
        if (!item) return;
        const btn = document.createElement('button');
        btn.style.cssText = 'display:block;width:100%;padding:10px;margin:4px 0;background:#3a3a5a;border:1px solid #555;border-radius:8px;color:#fff;cursor:pointer;font-size:14px;';
        btn.textContent = `${item.emoji} ${item.name}`;
        btn.addEventListener('click', () => {
            if (gameState.pet.activeDecor.length >= SHELVES_BY_STAGE[gameState.pet.stage]) {
                showToast('Нет свободных полок!', 1500); menu.remove(); return;
            }
            gameState.pet.activeDecor.push(id);
            renderShelves();
            renderActiveDecor();
            saveState();
            menu.remove();
            showToast(`Украшение размещено!`, 1500);
        });
        menu.appendChild(btn);
    });
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Закрыть';
    closeBtn.style.cssText = 'display:block;width:100%;padding:10px;margin-top:12px;background:#555;border:none;border-radius:8px;color:#fff;cursor:pointer;';
    closeBtn.addEventListener('click', () => menu.remove());
    menu.appendChild(closeBtn);
    document.body.appendChild(menu);
}
function renderInteriorWeather() {
    const canvas = document.getElementById('interior-weather-canvas');
    if (!canvas) return;
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width || 400;
    canvas.height = rect.height || 225;
    if (interiorWeatherInterval) clearInterval(interiorWeatherInterval);
    interiorWeatherInterval = setInterval(() => { drawInteriorWeather(canvas); }, 100);
    drawInteriorWeather(canvas);
}
function drawInteriorWeather(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    const season = gameState.season.current;
    if (season === 'spring') skyGrad.addColorStop(0, '#87CEEB');
    else if (season === 'summer') skyGrad.addColorStop(0, '#4A90D9');
    else if (season === 'autumn') skyGrad.addColorStop(0, '#D4A373');
    else skyGrad.addColorStop(0, '#B0C4DE');
    skyGrad.addColorStop(1, '#E8F0F8');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);
    const event = gameState.season?.event;
    if (event) {
        const name = event.name;
        if (name === 'Ливень') {
            ctx.strokeStyle = 'rgba(180,210,255,0.4)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * w, y = Math.random() * h;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4, y + 12); ctx.stroke();
            }
        } else if (name === 'Метель' || name === 'Похолодание') {
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * w, y = Math.random() * h, s = 1 + Math.random() * 3;
                ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI*2); ctx.fill();
            }
        } else if (name === 'Засуха') {
            ctx.strokeStyle = 'rgba(255,200,100,0.2)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                const y = 20 + i * 30 + Math.sin(Date.now()/1000 + i) * 5;
                ctx.moveTo(0, y);
                for (let x = 0; x < w; x += 5) ctx.lineTo(x, y + Math.sin(x/30 + Date.now()/800 + i) * 6);
                ctx.stroke();
            }
        }
    }
}
function renderInteriorDetails() {
    const container = document.getElementById('interior-container');
    if (!container) return;
    const oldPanel = container.querySelector('.interior-repair-panel');
    if (oldPanel) oldPanel.remove();
    const panel = document.createElement('div');
    panel.className = 'interior-repair-panel';
    panel.style.cssText = 'margin-top:12px;padding:10px;background:rgba(0,0,0,0.3);border-radius:8px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;';
    const durability = gameState.pet.homeDurability || 0;
    const percent = durability / HOME_DURABILITY_MAX;
    const needRepair = durability < HOME_DURABILITY_MAX;
    panel.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;">
            <span>🏠 Прочность:</span>
            <div style="width:100px;height:8px;background:#333;border-radius:4px;overflow:hidden;">
                <div style="width:${percent*100}%;height:100%;background:${percent>0.7?'#4caf50':percent>0.4?'#ff9800':'#f44336'};transition:width 0.3s;"></div>
            </div>
            <span>${Math.round(durability)}%</span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${needRepair ? `<button id="repair-home-btn" style="padding:6px 12px;background:#ffd700;border:none;border-radius:6px;color:#000;font-weight:bold;cursor:pointer;">🔧 Починить (${Math.ceil((HOME_DURABILITY_MAX - durability) * HOME_REPAIR_COST_PER_POINT)} 🪙)</button>` : '<span style="color:#4caf50;">✅ В идеальном состоянии</span>'}
            <button id="decor-shop-btn" style="padding:6px 12px;background:#8bc34a;border:none;border-radius:6px;color:#000;font-weight:bold;cursor:pointer;">🏪 Купить декор</button>
        </div>
    `;
    container.appendChild(panel);
    const repairBtn = panel.querySelector('#repair-home-btn');
    if (repairBtn) repairBtn.addEventListener('click', repairHome);
    const decorBtn = panel.querySelector('#decor-shop-btn');
    if (decorBtn) decorBtn.addEventListener('click', toggleHomeShop);
}
let homeShopPanel = document.getElementById('home-shop-panel');
let homeShopList = document.getElementById('home-shop-list');
function toggleHomeShop() {
    if (homeShopPanel) homeShopPanel.classList.toggle('open');
    renderHomeShop();
}

// ========== ИЗНОС ДОМА ==========
function updateHomeDurability(minutes) {
    if (!gameState.pet.homeDurability) gameState.pet.homeDurability = HOME_DURABILITY_MAX;
    if (!gameState.pet.lastDurabilityUpdate) gameState.pet.lastDurabilityUpdate = Date.now();
    let rate = HOME_BASE_DAMAGE_RATE;
    const season = gameState.season.current;
    rate *= HOME_DAMAGE_RATE_MULTIPLIER[season] || 1.0;
    const event = gameState.season.event;
    if (event && HOME_DAMAGE_EVENT_MULTIPLIER[event.name]) rate *= HOME_DAMAGE_EVENT_MULTIPLIER[event.name];
    if (gameState.pet.biome === 'aquatic') rate *= HOME_DAMAGE_AQUATIC_MULTIPLIER;
    const prevDurability = gameState.pet.homeDurability;
    gameState.pet.homeDurability = Math.max(0, gameState.pet.homeDurability - rate * minutes);
    if (gameState.pet.homeDurability <= 0 && prevDurability > 0) {
        addEvent('destroy', `Дом разрушен стихиями!`, '💀');
    }
    gameState.pet.lastDurabilityUpdate = Date.now();
    renderHome();
}
function repairHome() {
    const durability = gameState.pet.homeDurability || 0;
    const missing = HOME_DURABILITY_MAX - durability;
    if (missing <= 0) { showToast('Дом уже в идеальном состоянии!'); return; }
    const cost = Math.ceil(missing * HOME_REPAIR_COST_PER_POINT);
    if (gameState.pet.coins < cost) { showToast(`Недостаточно монет! Нужно ${cost} 🪙`); return; }
    gameState.pet.coins -= cost;
    gameState.pet.homeDurability = HOME_DURABILITY_MAX;
    updateCoinsDisplay();
    renderHome();
    renderInteriorDetails();
    addEvent('repair', `Дом отремонтирован до 100% (потрачено ${cost} монет)`, '🔧');
    saveState();
    showToast('Дом полностью восстановлен!');
}

// ========== ИНДИКАТОР КОРМЛЕНИЯ ==========
function updateLastFeedIndicator() {
    const el = document.getElementById('last-feed-indicator');
    if (!el) return;
    const lastFeed = gameState.pet.lastFeedTime;
    if (!lastFeed) { el.textContent = '🍗 никогда'; el.className = 'last-feed-indicator danger'; return; }
    const now = Date.now();
    const diffMs = now - lastFeed;
    const hours = Math.floor(diffMs / (60 * 60 * 1000));
    const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));
    let text = '', cls = 'last-feed-indicator';
    if (hours > 0) {
        text = `🍗 ${hours}ч ${minutes}м назад`;
        if (hours >= 2) cls += ' danger';
        else if (hours >= 1) cls += ' warning';
    } else if (minutes > 5) {
        text = `🍗 ${minutes}м назад`;
        if (minutes > 20) cls += ' warning';
    } else { text = '🍗 только что'; }
    el.textContent = text;
    el.className = cls;
    if (navigator.setAppBadge) {
        if (hours >= 2) navigator.setAppBadge(Math.min(hours, 99));
        else navigator.clearAppBadge();
    }
}

// ========== ВИЗИТ СОСЕДА ==========
function checkNeighborVisit() {
    const hasFire = gameState.pet.activeDecor && gameState.pet.activeDecor.includes('fire');
    if (!hasFire) return;
    if (gameState.walk.active || gameState.work.active) return;
    if (gameState.pet.runaway) return;
    const now = Date.now();
    if (!gameState.neighborVisitCooldown) gameState.neighborVisitCooldown = now;
    if (now - gameState.neighborVisitCooldown < NEIGHBOR_VISIT_INTERVAL) return;
    gameState.neighborVisitCooldown = now;
    if (Math.random() > NEIGHBOR_VISIT_CHANCE) return;
    const visitors = ['🐕', '🐈', '🐇', '🦊', '🐿️', '🦔', '🐦', '🦜'];
    const visitor = visitors[Math.floor(Math.random() * visitors.length)];
    const gifts = ['🍎', '🍌', '🍇', '🥕', '🍞', '🧀', '🍪', '🍯'];
    const gift = Math.random() < 0.2 ? gifts[Math.floor(Math.random() * gifts.length)] : null;
    const fireEl = document.querySelector('.decor-item[title="🔥 Костер"]');
    if (fireEl) {
        const visitorEl = document.createElement('div');
        visitorEl.style.cssText = 'position:absolute;top:-30px;left:50%;transform:translateX(-50%);font-size:32px;z-index:20;animation:visitorAppear 0.5s ease, visitorDisappear 0.5s ease 2.5s forwards;';
        visitorEl.textContent = visitor;
        fireEl.parentElement.appendChild(visitorEl);
        setTimeout(() => visitorEl.remove(), 3500);
    }
    gameState.pet.mood = clamp(gameState.pet.mood + 10, 0, 100);
    if (gift) {
        const giftItem = { id: `gift_${Date.now()}`, name: `Подарок от соседа`, emoji: gift, rarity: 'common', type: 'loot' };
        gameState.pet.inventory.push(giftItem);
        showToast(`🐾 Сосед принёс подарок: ${gift}!`, 2500);
        addEvent('neighbor', `Сосед ${visitor} принёс ${gift}`, '🎁');
    } else {
        showToast(`🐾 Сосед ${visitor} заглянул на огонёк!`, 2000);
        addEvent('neighbor', `Сосед ${visitor} посетил костёр`, '🐾');
    }
    updateStatBars();
    renderInventory();
    saveState();
}

// ========== ДНЕВНИК СОБЫТИЙ ==========
function addEvent(type, text, icon) {
    if (!gameState.eventLog) gameState.eventLog = [];
    const day = gameState.pet?.age || 0;
    gameState.eventLog.push({ type, text, icon: icon || '📌', timestamp: Date.now(), day });
    if (gameState.eventLog.length > 30) gameState.eventLog = gameState.eventLog.slice(-30);
    saveState();
}
function toggleDiary() {
    const modal = document.getElementById('diary-modal');
    if (!modal) return;
    if (modal.style.display === 'flex') { modal.style.display = 'none'; return; }
    renderDiary();
    modal.style.display = 'flex';
}
function renderDiary() {
    const list = document.getElementById('diary-list');
    const empty = document.getElementById('diary-empty');
    if (!list) return;
    const events = gameState.eventLog || [];
    if (events.length === 0) { list.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
    if (empty) empty.style.display = 'none';
    const reversed = [...events].reverse();
    list.innerHTML = reversed.map(e =>
        `<div class="diary-item ${e.type || ''}"><span class="diary-item-icon">${e.icon || '📌'}</span><span class="diary-item-text">${e.text}</span><span class="diary-item-day">день ${e.day}</span></div>`
    ).join('');
}
function openReleaseModal() {
    const modal = document.getElementById('release-modal');
    if (!modal) return;
    const nameEl = document.getElementById('release-pet-name');
    if (nameEl) nameEl.textContent = gameState.pet.name || 'питомца';
    modal.style.display = 'flex';
}
function closeReleaseModal() {
    const modal = document.getElementById('release-modal');
    if (modal) modal.style.display = 'none';
}
function confirmRelease() {
    const pet = gameState.pet;
    const releasedPet = { name: pet.name || 'Безымянный', biome: pet.biome, petId: pet.petId, age: pet.age, stage: pet.stage, days: pet.age || 0, releasedAt: Date.now() };
    if (!gameState.releasedPets) gameState.releasedPets = [];
    gameState.releasedPets.push(releasedPet);
    gameState.totalPetsStarted = (gameState.totalPetsStarted || 0) + 1;
    showToast(`🕊️ ${pet.name} отпущен на волю. Всего заведено питомцев: ${gameState.totalPetsStarted}`, 3000);
    closeReleaseModal();
    const stats = { releasedPets: gameState.releasedPets, totalPetsStarted: gameState.totalPetsStarted };
    gameState = defaultGameState();
    gameState.releasedPets = stats.releasedPets;
    gameState.totalPetsStarted = stats.totalPetsStarted;
    showSelectionScreen();
    updateSelectionStats();
    saveState();
}
function updateSelectionStats() {
    const screen = document.getElementById('selection-screen');
    if (!screen) return;
    const total = gameState.totalPetsStarted || 0;
    const oldStats = document.getElementById('selection-stats');
    if (oldStats) oldStats.remove();
    if (total > 0) {
        const statsEl = document.createElement('div');
        statsEl.id = 'selection-stats';
        statsEl.style.cssText = 'position:fixed;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.6);color:#ffd700;padding:6px 14px;border-radius:20px;font-size:13px;z-index:10;border:1px solid rgba(255,215,0,0.3);cursor:pointer;';
        statsEl.textContent = `🐾 Питомцев заведено: ${total}`;
        statsEl.title = 'Нажмите для просмотра списка';
        statsEl.addEventListener('click', showReleasedPetsList);
        screen.appendChild(statsEl);
    }
}
function showReleasedPetsList() {
    const list = gameState.releasedPets || [];
    if (list.length === 0) { showToast('Пока нет отпущенных питомцев'); return; }
    const names = list.map((p, i) => `${i+1}. ${p.name} (${p.biome}, ${p.days} дн., ${p.stage})`).join('\n');
    alert('📜 Список отпущенных питомцев:\n\n' + names);
}
function disableActions(disabled) {
    ['btn-feed', 'btn-drink', 'btn-pet', 'btn-sleep', 'btn-work', 'btn-toggle-shop', 'btn-go-sea'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.disabled = disabled;
    });
}
function spawnFloatingEmojis(emoji, count = 12, duration = 2000) {
    const container = document.getElementById('game-background');
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.textContent = emoji;
        el.style.cssText = `position:absolute;font-size:${20+Math.random()*25}px;pointer-events:none;z-index:20;left:${20+Math.random()*60}%;top:${30+Math.random()*40}%;opacity:0;transition:all ${1+Math.random()*1.5}s ease-out;`;
        container.appendChild(el);
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = `translateY(-${80+Math.random()*120}px) scale(${0.5+Math.random()*0.8})`;
            el.style.opacity = '0';
        });
        setTimeout(() => el.remove(), duration + 100);
    }
}

// ========== ДОСТИЖЕНИЯ ==========
function checkAchievements() {
    const u = gameState.achievements.unlocked;
    if (!u.includes('first_walk') && (gameState.walkCount || 0) > 0) unlockAchievement('first_walk');
    if (!u.includes('collector_10') && gameState.pet.inventory.length >= 10) unlockAchievement('collector_10');
    if (!u.includes('rich_500') && gameState.pet.coins >= 500) unlockAchievement('rich_500');
    if (!u.includes('adult') && gameState.pet.stage === 'adult') unlockAchievement('adult');
    if (!u.includes('all_stats_100') && gameState.pet.hunger > 90 && gameState.pet.energy > 90 && gameState.pet.mood > 90 && gameState.pet.health > 90) unlockAchievement('all_stats_100');
    if (!u.includes('decor_5') && gameState.pet.decor.length >= 5) unlockAchievement('decor_5');
    if (!u.includes('walk_10') && (gameState.walkCount || 0) >= 10) unlockAchievement('walk_10');
    if (!u.includes('survive_week') && gameState.pet.age >= 7) unlockAchievement('survive_week');
}
function unlockAchievement(id) {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach || gameState.achievements.unlocked.includes(id)) return;
    gameState.achievements.unlocked.push(id);
    playSound('achievement');
    showAchievementPopup(ach);
    renderAchievementsPanel();
}
function showAchievementPopup(ach) {
    if (!achievementPopup) return;
    achievementPopup.querySelector('.ach-emoji').textContent = ach.emoji;
    achievementPopup.querySelector('.ach-name').textContent = ach.name;
    achievementPopup.querySelector('.ach-desc').textContent = ach.desc;
    achievementPopup.classList.add('show');
    setTimeout(() => achievementPopup.classList.remove('show'), 3000);
}
function toggleAchievements() {
    if (achievementsPanel) achievementsPanel.classList.toggle('open');
    renderAchievementsPanel();
}
function renderAchievementsPanel() {
    if (!achievementList) return;
    achievementList.innerHTML = '';
    ACHIEVEMENTS.forEach(ach => {
        const unlocked = gameState.achievements.unlocked.includes(ach.id);
        const el = document.createElement('div');
        el.className = 'achievement-item ' + (unlocked ? 'unlocked' : 'locked');
        el.innerHTML = `<span class="ach-icon">${unlocked ? ach.emoji : '🔒'}</span><div class="ach-info"><div class="ach-name">${ach.name}</div><div class="ach-desc">${ach.desc}</div></div>`;
        achievementList.appendChild(el);
    });
}

// ========== ВЫБОР ПИТОМЦА ==========
function setupBiomeTabs() {
    document.querySelectorAll('.biome-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.biome-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const biome = tab.dataset.biome;
            renderPetGrid(biome);
            updateSelectionBackground(biome);
        });
    });
}
function renderPetGrid(biome) {
    if (!petGrid) return;
    petGrid.innerHTML = '';
    const pets = PETS[biome];
    if (!pets) return;
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'pet-card';
        card.dataset.biome = biome;
        card.dataset.petId = pet.id;
        if (gameState.selectedBiome === biome && gameState.selectedPetId === pet.id) card.classList.add('selected');
        card.innerHTML = `<div class="pet-icon">${pet.emoji}</div><div class="pet-label">${pet.name}</div><div class="pet-label" style="font-size:10px;color:#888">${pet.type}</div>`;
        card.addEventListener('click', () => selectPet(biome, pet.id));
        petGrid.appendChild(card);
    });
}
function selectPet(biome, petId) {
    document.querySelectorAll('.pet-card').forEach(c => c.classList.remove('selected'));
    const card = document.querySelector(`.pet-card[data-biome="${biome}"][data-pet-id="${petId}"]`);
    if (card) card.classList.add('selected');
    gameState.selectedBiome = biome;
    gameState.selectedPetId = petId;
    nameInputArea.classList.remove('hidden');
    petNameInput.focus();
    saveState();
}
function setupNameInput() {
    petNameInput.addEventListener('input', () => { confirmBtn.disabled = petNameInput.value.trim().length === 0; });
    confirmBtn.addEventListener('click', () => {
        const name = petNameInput.value.trim();
        if (!name || !gameState.selectedPetId || !gameState.selectedBiome) return;
        gameState.petName = name;
        gameState.pet.name = name;
        gameState.pet.biome = gameState.selectedBiome;
        gameState.pet.petId = gameState.selectedPetId;
        gameState.pet.incomeCooldown = Date.now() + 60000;
        gameState.pet.birthday = Date.now();
        gameState.pet.lastAgeCheck = Date.now();
        gameState.screen = 'game';
        saveState();
        showGameScreen();
    });
}
function updateSelectionBackground(biome) {
    const screen = document.getElementById('selection-screen');
    if (!screen) return;
    const bgData = BIOME_BG?.[biome];
    if (!bgData) { screen.style.background = '#1a1a2e'; return; }
    const colors = bgData.colors;
    const grad = `linear-gradient(180deg, ${colors.sky} 0%, ${colors.ground} 70%, ${colors.groundDark} 100%)`;
    screen.style.background = grad;
    screen.style.backgroundSize = 'cover';
    screen.style.transition = 'background 0.5s';
}

// ========== ФОНЫ БИОМОВ ==========
const BIOME_BG = {
    forest: {
        colors: { ground: '#3a7a3a', groundDark: '#2a5a2a', sky: '#87CEEB' },
        trees: [{x:0.05,w:0.12,h:0.35,type:'oak'},{x:0.25,w:0.15,h:0.40,type:'pine'},{x:0.50,w:0.18,h:0.45,type:'oak'},{x:0.75,w:0.14,h:0.38,type:'pine'},{x:0.92,w:0.10,h:0.30,type:'oak'}],
        bushes: [{x:0.10,w:0.08,h:0.05},{x:0.40,w:0.10,h:0.06},{x:0.70,w:0.07,h:0.04}],
        flowers: [{x:0.15,y:0.85,color:'#ff6b6b'},{x:0.35,y:0.88,color:'#ffd93d'},{x:0.60,y:0.82,color:'#6bcbff'},{x:0.80,y:0.87,color:'#ff6b6b'}],
        seasonEffects: { spring: { leafColor: '#5cb85c', flowerChance: 0.3, leafFall: false }, summer: { leafColor: '#4caf50', flowerChance: 0.1, leafFall: true }, autumn: { leafColor: '#d4a373', flowerChance: 0, leafFall: true }, winter: { leafColor: '#8a9ba8', flowerChance: 0, leafFall: false } }
    },
    desert: {
        colors: { ground: '#d4a373', groundDark: '#b5835a', sky: '#f4d58d' },
        dunes: [{x:0,w:0.4,h:0.08,shift:0},{x:0.3,w:0.5,h:0.10,shift:0.2},{x:0.6,w:0.5,h:0.06,shift:0.5}],
        cacti: [{x:0.08,w:0.04,h:0.12},{x:0.22,w:0.03,h:0.08},{x:0.45,w:0.05,h:0.15},{x:0.70,w:0.04,h:0.10},{x:0.88,w:0.03,h:0.07}],
        rocks: [{x:0.15,w:0.04,h:0.03},{x:0.55,w:0.06,h:0.04},{x:0.85,w:0.03,h:0.02}],
        seasonEffects: { spring: { skyColor: '#f4d58d', groundColor: '#d4a373' }, summer: { skyColor: '#f7dc6f', groundColor: '#c4956a' }, autumn: { skyColor: '#e8c68a', groundColor: '#b5835a' }, winter: { skyColor: '#d4c4b0', groundColor: '#b8a88a' } }
    },
    aquatic: {
        colors: { water: '#2a7a9a', waterLight: '#4a9aba', waterDark: '#1a5a7a', sky: '#6bcbff' },
        corals: [{x:0.05,w:0.06,h:0.08,color:'#ff6b6b'},{x:0.20,w:0.08,h:0.10,color:'#ff9f43'},{x:0.50,w:0.07,h:0.09,color:'#ff6b6b'},{x:0.75,w:0.05,h:0.07,color:'#ff9f43'},{x:0.92,w:0.06,h:0.08,color:'#ff6b6b'}],
        seaweed: [{x:0.12,h:0.10,color:'#2ecc71'},{x:0.35,h:0.12,color:'#27ae60'},{x:0.62,h:0.08,color:'#2ecc71'},{x:0.85,h:0.14,color:'#27ae60'}],
        bubbles: [{x:0.2,y:0.8,speed:0.2,size:3},{x:0.4,y:0.6,speed:0.3,size:4},{x:0.6,y:0.7,speed:0.15,size:2},{x:0.8,y:0.5,speed:0.25,size:3}],
        seasonEffects: { spring: { waterColor: '#2a8a9a', lightIntensity: 1.0 }, summer: { waterColor: '#1a7a9a', lightIntensity: 1.2 }, autumn: { waterColor: '#3a6a8a', lightIntensity: 0.9 }, winter: { waterColor: '#4a6a7a', lightIntensity: 0.7 } }
    },
    frozen: {
        colors: { ground: '#e8f0f8', groundDark: '#c8d8e8', sky: '#b0c4de' },
        iceBlocks: [{x:0.05,w:0.08,h:0.05},{x:0.20,w:0.12,h:0.07},{x:0.40,w:0.06,h:0.04},{x:0.60,w:0.10,h:0.06},{x:0.80,w:0.07,h:0.05}],
        snowMounds: [{x:0.10,w:0.15,h:0.04},{x:0.35,w:0.20,h:0.05},{x:0.65,w:0.12,h:0.03},{x:0.85,w:0.18,h:0.05}],
        trees: [{x:0.08,w:0.06,h:0.15,snow:0.5},{x:0.30,w:0.08,h:0.20,snow:0.6},{x:0.55,w:0.07,h:0.18,snow:0.4},{x:0.78,w:0.05,h:0.12,snow:0.5}],
        seasonEffects: { spring: { snowChance: 0.3, iceColor: '#d0e0f0' }, summer: { snowChance: 0.1, iceColor: '#b0c8e0' }, autumn: { snowChance: 0.2, iceColor: '#c0d0e0' }, winter: { snowChance: 0.6, iceColor: '#e0ecf8' } }
    },
    volcanic: {
        colors: { ground: '#4a2a1a', groundDark: '#2a1a0a', sky: '#8a3a2a' },
        lava: [{x:0.10,w:0.15,h:0.03,intensity:0.8},{x:0.35,w:0.20,h:0.04,intensity:0.6},{x:0.60,w:0.12,h:0.03,intensity:0.9},{x:0.80,w:0.18,h:0.04,intensity:0.7}],
        rocks: [{x:0.05,w:0.04,h:0.02},{x:0.25,w:0.06,h:0.03},{x:0.50,w:0.03,h:0.02},{x:0.70,w:0.05,h:0.03},{x:0.90,w:0.04,h:0.02}],
        ashParticles: [{x:0.2,y:0.2,speed:0.5,size:2},{x:0.5,y:0.3,speed:0.3,size:3},{x:0.8,y:0.1,speed:0.4,size:2}],
        seasonEffects: { spring: { glowIntensity: 0.8, ashRate: 0.3 }, summer: { glowIntensity: 1.0, ashRate: 0.5 }, autumn: { glowIntensity: 0.9, ashRate: 0.4 }, winter: { glowIntensity: 0.7, ashRate: 0.2 } }
    }
};

let bgCanvas, bgCtx, bgAnimationId = null;
function initBackground() {
    bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;
    bgCtx = bgCanvas.getContext('2d');
    resizeBgCanvas();
    window.addEventListener('resize', resizeBgCanvas);
    startBgAnimation();
}
function resizeBgCanvas() {
    if (!bgCanvas) return;
    const rect = bgCanvas.parentElement.getBoundingClientRect();
    bgCanvas.width = rect.width || window.innerWidth;
    bgCanvas.height = rect.height || window.innerHeight;
}
function startBgAnimation() {
    if (bgAnimationId) cancelAnimationFrame(bgAnimationId);
    animateBg();
}
function animateBg() {
    if (!bgCanvas || !bgCtx) return;
    const ctx = bgCtx, w = bgCanvas.width, h = bgCanvas.height;
    ctx.clearRect(0, 0, w, h);
    const biome = gameState.pet?.biome || 'forest';
    const season = gameState.season?.current || 'spring';
    const bgData = BIOME_BG[biome];
    if (bgData) drawBiomeBackground(ctx, w, h, biome, season, bgData);
    bgAnimationId = requestAnimationFrame(animateBg);
}
function drawBiomeBackground(ctx, w, h, biome, season, bgData) {
    const colors = bgData.colors;
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, colors.sky || '#87CEEB');
    skyGrad.addColorStop(1, colors.ground || '#3a7a3a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);
    const groundY = h * 0.7;
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, groundY, w, h - groundY);
    // Упрощённо рисуем только базовые элементы для экономии
    if (biome === 'forest') {
        bgData.trees.forEach(tree => {
            const x = tree.x * w, treeW = tree.w * w, treeH = tree.h * h;
            const trunkW = treeW * 0.15, trunkH = treeH * 0.3;
            const crownY = groundY - treeH + trunkH;
            ctx.fillStyle = '#6b4a2a';
            ctx.fillRect(x + treeW/2 - trunkW/2, groundY - trunkH, trunkW, trunkH);
            ctx.fillStyle = bgData.seasonEffects[season]?.leafColor || '#4caf50';
            ctx.beginPath();
            ctx.ellipse(x + treeW/2, crownY + treeH * 0.15, treeW/2, treeH * 0.5, 0, 0, Math.PI*2);
            ctx.fill();
        });
    } else if (biome === 'desert') {
        bgData.cacti.forEach(c => {
            const x = c.x * w, cw = c.w * w, ch = c.h * h;
            ctx.fillStyle = '#2e7d32';
            ctx.fillRect(x, groundY - ch, cw, ch);
            ctx.fillRect(x - cw*0.3, groundY - ch*0.6, cw*0.3, ch*0.5);
            ctx.fillRect(x + cw, groundY - ch*0.7, cw*0.3, ch*0.5);
        });
    } else if (biome === 'aquatic') {
        // Вода уже есть, добавим водоросли
        bgData.seaweed.forEach(s => {
            ctx.fillStyle = s.color;
            const x = s.x * w, sw = 4, sh = s.h * h;
            ctx.fillRect(x, groundY - sh, sw, sh);
            ctx.fillRect(x + 3, groundY - sh*0.8, sw, sh*0.8);
        });
    } else if (biome === 'frozen') {
        bgData.snowMounds.forEach(m => {
            ctx.fillStyle = '#e8f0f8';
            const x = m.x * w, mw = m.w * w, mh = m.h * h;
            ctx.beginPath();
            ctx.ellipse(x + mw/2, groundY - mh/2, mw/2, mh/2, 0, 0, Math.PI*2);
            ctx.fill();
        });
    } else if (biome === 'volcanic') {
        bgData.lava.forEach(l => {
            const x = l.x * w, lw = l.w * w, lh = l.h * h;
            ctx.fillStyle = '#ff4500';
            ctx.globalAlpha = 0.6 + Math.sin(Date.now()/500 + l.x) * 0.3;
            ctx.fillRect(x, groundY - lh, lw, lh);
            ctx.globalAlpha = 1;
        });
    }
}

// ========== ОФЛАЙН ==========
function checkOfflineProgress() {
    const now = Date.now();
    const lastSave = localStorage.getItem('tamagotchi_last_save');
    if (!lastSave) return;
    const offlineMs = now - parseInt(lastSave);
    if (offlineMs <= 30000) return;
    const offlineMinutes = Math.min(offlineMs / 60000, 600);
    const offlineCoins = Math.floor(offlineMinutes * INCOME_RATE * 0.5);
    gameState.pet.coins += offlineCoins;
    const decay = getEffectiveDecay();
    const offlineDecay = Math.min(offlineMinutes, 30);
    gameState.pet.hunger = clamp(gameState.pet.hunger - decay.hunger * offlineDecay, 0, 100);
    gameState.pet.energy = clamp(gameState.pet.energy - decay.energy * offlineDecay, 0, 100);
    gameState.pet.mood = clamp(gameState.pet.mood - decay.mood * offlineDecay, 0, 100);
    recalcHealth();
    updateCoinsDisplay();
    updateStatBars();
    const recentEvents = (gameState.eventLog || []).filter(e => e.timestamp > parseInt(lastSave)).slice(-5);
    if (offlineCoins > 0 || offlineMinutes > 1 || recentEvents.length > 0) {
        showOfflinePopup(offlineCoins, Math.floor(offlineMinutes), recentEvents);
    }
}
function showOfflinePopup(coins, minutes, events) {
    if (!offlinePopup) return;
    offlinePopup.querySelector('.offline-coins').textContent = coins;
    offlinePopup.querySelector('.offline-time').textContent = minutes;
    let eventsHtml = '';
    if (events && events.length > 0) {
        eventsHtml = '<div style="margin-top:8px;font-size:12px;color:#aaa;text-align:left;max-height:100px;overflow-y:auto;">';
        events.forEach(e => { eventsHtml += `<div>${e.icon} ${e.text} (день ${e.day})</div>`; });
        eventsHtml += '</div>';
    }
    const existingEvents = offlinePopup.querySelector('.offline-events');
    if (existingEvents) existingEvents.innerHTML = eventsHtml;
    offlinePopup.classList.add('show');
    setTimeout(() => offlinePopup.classList.remove('show'), 5000);
}
function exportStatistics() {
    const p = gameState.pet;
    const now = new Date();
    const lines = [];
    lines.push(`📊 СТАТИСТИКА ПИТОМЦА`); lines.push(`====================`);
    lines.push(`Имя: ${p.name}`); lines.push(`Вид: ${p.petId} (${p.biome})`); lines.push(`Возраст: ${p.age} дней`);
    lines.push(`Стадия: ${STAGES[p.stage].name}`); lines.push(`Здоровье: ${p.health}%`); lines.push(`Голод: ${p.hunger}%`);
    lines.push(`Энергия: ${p.energy}%`); lines.push(`Настроение: ${p.mood}%`); lines.push(`Привязанность: ${p.affection || 0}%`);
    lines.push(`Монет: ${p.coins}`); lines.push(`Прогулок: ${gameState.walkCount || 0}`);
    lines.push(`Травм получено: ${gameState.pet.scars ? gameState.pet.scars.length : 0}`);
    lines.push(`Достижений: ${gameState.achievements.unlocked.length}`); lines.push(`Предметов в инвентаре: ${p.inventory.length}`);
    lines.push(`Дом: ${HOMES[p.home]?.name || 'базовый'}`); lines.push(`Открытое море: ${p.isOpenSea ? 'Да' : 'Нет'}`);
    lines.push(`Сезон: ${SEASONS[gameState.season.current].name}`); lines.push(`Дата экспорта: ${now.toLocaleString()}`);
    lines.push(`====================`); lines.push(`🏆 Достижения:`);
    if (gameState.achievements.unlocked.length === 0) lines.push(`  Нет достижений`);
    else gameState.achievements.unlocked.forEach(id => {
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        if (ach) lines.push(`  ${ach.emoji} ${ach.name} — ${ach.desc}`);
    });
    lines.push(`====================`); lines.push(`🎒 Инвентарь (лут):`);
    if (p.inventory.length === 0) lines.push(`  Пусто`);
    else p.inventory.forEach(item => {
        const rarity = item.rarity || 'common';
        const config = RARITY_CONFIG[rarity] || RARITY_CONFIG.common;
        lines.push(`  ${item.emoji} ${item.name} (${config.label})`);
    });
    lines.push(`====================`); lines.push(`🍗 Еда:`);
    for (const [id, entries] of Object.entries(p.food)) {
        const summary = getFoodSummary(id);
        if (summary.totalAmount > 0) {
            let food = FOOD_TYPES.find(f => f.id === id);
            let name = food ? food.name : id;
            if (id.startsWith('cooked_')) name = 'Приготовленная ' + name;
            lines.push(`  ${name}: ${summary.totalAmount} шт. (свежесть ${Math.round(summary.minFreshness)}%)`);
        }
    }
    lines.push(`💧 Вода:`);
    for (const [id, entries] of Object.entries(p.water)) {
        const total = entries.reduce((s, e) => s + e.amount, 0);
        if (total > 0) {
            const water = WATER_TYPES.find(w => w.id === id);
            if (water) lines.push(`  ${water.emoji} ${water.name}: ${total} шт.`);
        }
    }
    lines.push(`====================`); lines.push(`💔 Шрамы:`);
    if (p.scars && p.scars.length > 0) {
        p.scars.forEach((scar, i) => {
            const date = new Date(scar.date).toLocaleDateString();
            lines.push(`  ${i+1}. ${scar.emoji} ${scar.name} (день ${scar.day}) — ${date}`);
        });
    } else lines.push(`  Нет шрамов`);
    lines.push(`====================`); lines.push(`✨ Удачи в воспитании! ✨`);
    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statistics_${p.name}_${now.toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📊 Статистика экспортирована!');
}
function resetGame() {
    if (confirm('Точно сбросить весь прогресс? Это нельзя отменить.')) {
        localStorage.removeItem('tamagotchi_save');
        localStorage.removeItem('tamagotchi_last_save');
        gameState = defaultGameState();
        if (window._gameLoopInterval) { clearInterval(window._gameLoopInterval); window._gameLoopInterval = null; }
        if (window._skyInterval) { clearInterval(window._skyInterval); window._skyInterval = null; }
        showSelectionScreen();
        renderPetGrid('forest');
        nameInputArea.classList.add('hidden');
        petNameInput.value = '';
        confirmBtn.disabled = true;
        document.querySelectorAll('.pet-card').forEach(c => c.classList.remove('selected'));
    }
}

// ========== НАСТРОЙКА ДЕЙСТВИЙ ==========
function setupActionButtons() {
    if (btnFeed) btnFeed.addEventListener('click', openFoodPanel);
    if (btnDrink) btnDrink.addEventListener('click', openWaterPanel);
    if (btnPet) btnPet.addEventListener('click', petPet);
    if (btnSleep) btnSleep.addEventListener('click', sleepPet);
    if (btnWalk) btnWalk.addEventListener('click', startWalk);
    if (btnWork) btnWork.addEventListener('click', startWork);
    if (btnGoSea) btnGoSea.addEventListener('click', goToOpenSea);
    if (btnToggleShop) btnToggleShop.addEventListener('click', toggleShop);
    if (btnCloseShop) btnCloseShop.addEventListener('click', toggleShop);
    if (btnAchievements) btnAchievements.addEventListener('click', toggleAchievements);
    if (btnCloseAchievements) btnCloseAchievements.addEventListener('click', toggleAchievements);
    if (btnCloseFood) btnCloseFood.addEventListener('click', closeFoodPanel);
    if (btnCloseWater) btnCloseWater.addEventListener('click', closeWaterPanel);
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    const exportBtn = document.getElementById('hud-export');
    if (exportBtn) exportBtn.addEventListener('click', exportStatistics);
    // Кнопка отпускания
    const releaseBtn = document.getElementById('hud-release');
    if (releaseBtn) releaseBtn.addEventListener('click', openReleaseModal);
    // Кнопка дневника
    const diaryBtn = document.getElementById('hud-diary');
    if (diaryBtn) diaryBtn.addEventListener('click', toggleDiary);
    // Кнопка закрытия дневника
    const diaryClose = document.getElementById('diary-close-btn');
    if (diaryClose) diaryClose.addEventListener('click', toggleDiary);
    const diaryModal = document.getElementById('diary-modal');
    if (diaryModal) diaryModal.addEventListener('click', function(e) { if (e.target === this) toggleDiary(); });
    // Интерьер
    const homeContainer = document.getElementById('home-container');
    if (homeContainer) homeContainer.addEventListener('click', openInterior);
    const interiorClose = document.getElementById('interior-close');
    if (interiorClose) interiorClose.addEventListener('click', closeInterior);
    const interiorOverlay = document.getElementById('interior-overlay');
    if (interiorOverlay) interiorOverlay.addEventListener('click', function(e) { if (e.target === this) closeInterior(); });
    // Модалка предмета
    const itemModalClose = document.getElementById('item-modal-close');
    if (itemModalClose) itemModalClose.addEventListener('click', closeItemModal);
    // Модалка отпускания
    const releaseConfirm = document.getElementById('release-confirm-btn');
    if (releaseConfirm) releaseConfirm.addEventListener('click', confirmRelease);
    const releaseCancel = document.getElementById('release-cancel-btn');
    if (releaseCancel) releaseCancel.addEventListener('click', closeReleaseModal);
    const releaseModal = document.getElementById('release-modal');
    if (releaseModal) releaseModal.addEventListener('click', function(e) { if (e.target === this) closeReleaseModal(); });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
function init() {
    const saved = loadState();
    if (saved && saved.screen === 'game') {
        gameState = saved;
        if (!gameState.walkCount) gameState.walkCount = 0;
        if (!gameState.eventLog) gameState.eventLog = [];
        if (!gameState.releasedPets) gameState.releasedPets = [];
        if (!gameState.totalPetsStarted) gameState.totalPetsStarted = 0;
        migrateFood();
        initSeason();
        showGameScreen();
        if (gameState.walk.active && gameState.walk.startTime) {
            if (Date.now() - gameState.walk.startTime >= gameState.walk.duration) completeWalk();
        }
        if (gameState.work && gameState.work.active && gameState.work.startTime) {
            if (Date.now() - gameState.work.startTime >= gameState.work.duration) completeWork();
        }
        updateSeasonUI();
        updateEventUI();
    } else {
        gameState = defaultGameState();
        showSelectionScreen();
        renderPetGrid('forest');
        setupBiomeTabs();
        setupNameInput();
        updateSelectionBackground('forest');
    }
    setupActionButtons();
    setTimeout(checkOfflineProgress, 1000);
}
function migrateFood() {
    const food = gameState.pet.food;
    if (!food) { gameState.pet.food = {}; return; }
    let needsMigrate = false;
    for (const key of Object.keys(food)) {
        if (typeof food[key] === 'number') { needsMigrate = true; break; }
    }
    if (!needsMigrate) return;
    const newFood = {};
    for (const [id, amount] of Object.entries(food)) {
        if (amount > 0) newFood[id] = [{ amount, freshness: 100 }];
        else newFood[id] = [];
    }
    gameState.pet.food = newFood;
}

// Запуск
init();