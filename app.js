const FAVORITES_KEY = "speakflow_favorite_videos";
const PROGRESS_KEY = "speakflow_learning_progress";
const AI_SESSION_KEY = "speakflow_ai_session";

const videos = [
  {
    id: "meeting-follow-up",
    title: "会议里如何自然接话",
    description: "真实职场会议片段，训练确认信息、表达赞同、补充观点和礼貌提出不同意见。",
    source: "Workplace English",
    sourceType: "workplace",
    topic: "workplace",
    topicLabel: "职场表达",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 6,
    date: "2026/4/24",
    thumb: "meeting",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    videoType: "video/mp4",
    demoNote: "Demo 视频：用于测试播放器和学习页流程，后续替换为真实英语片段。",
    featured: true,
    sentences: [
      { english: "I just want to make sure I understand the timeline.", chinese: "我只是想确认一下我理解的时间线是对的。", note: "make sure I understand... 是职场中确认信息的高频表达。" },
      { english: "That makes sense, but I have one concern.", chinese: "这说得通，不过我有一个顾虑。", note: "That makes sense, but... 可以礼貌地转入不同意见。" },
      { english: "Could we revisit this after we check the numbers?", chinese: "我们核对数据之后，能不能再回来看这个问题？", note: "revisit this 适合表达稍后重新讨论。" }
    ]
  },
  {
    id: "ted-speaking-listen",
    title: "TED 演讲：如何让别人愿意听你说话",
    description: "TED 外部精选素材，用完整演讲训练开场、停顿、重音和观点表达。当前只嵌入官方播放器，不下载或剪辑视频。",
    source: "TED",
    sourceType: "interview",
    topic: "interview",
    topicLabel: "公开演讲",
    difficulty: "advanced",
    difficultyLabel: "高级",
    durationMinutes: 10,
    date: "2026/4/28",
    thumb: "ted",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen",
    sourceUrl: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：当前仅用于体验验证。商业化或课程化使用 TED 内容前，需要确认 TED 授权规则。",
    sentences: [
      { english: "The human voice: It's the instrument we all play.", chinese: "人类的声音，是我们每个人都会演奏的乐器。", note: "The human voice 是演讲开场常见的主题句，用来快速建立讨论对象。" },
      { english: "How can we speak powerfully to make change in the world?", chinese: "我们如何有力量地说话，从而改变世界？", note: "How can we... 是演讲中提出核心问题的自然结构。" },
      { english: "There are a number of habits that we need to move away from.", chinese: "有一些习惯是我们需要远离的。", note: "move away from 可用于表达摆脱旧习惯或低效做法。" }
    ]
  },
  { id: "kitchen-vlog", title: "一眼心动的厨房", description: "生活 Vlog 片段，适合训练自然语速下的日常描述和空间表达。", source: "Maddie Borge", sourceType: "vlog", topic: "daily", topicLabel: "日常", difficulty: "intermediate", difficultyLabel: "中级", durationMinutes: 2, date: "2026/4/23", thumb: "kitchen" },
  { id: "dinner-ootd", title: "晚宴 OOTD", description: "短 Vlog 穿搭分享，适合练语速、连读和轻松自我描述。", source: "Michelle Choi", sourceType: "vlog", topic: "daily", topicLabel: "Vlog", difficulty: "beginner", difficultyLabel: "初级", durationMinutes: 1, date: "2026/4/22", thumb: "ootd" },
  { id: "interview-opinion", title: "采访中如何表达观点", description: "访谈片段，学习解释想法、补充原因和自然转折。", source: "Mel Robbins", sourceType: "interview", topic: "interview", topicLabel: "采访", difficulty: "intermediate", difficultyLabel: "中级", durationMinutes: 7, date: "2026/4/21", thumb: "interview" },
  { id: "coffee-before-work", title: "上班前的咖啡时间", description: "从买咖啡到进入工作状态，练习高频生活动词和寒暄表达。", source: "Alex Daily", sourceType: "vlog", topic: "workplace", topicLabel: "职场日常", difficulty: "beginner", difficultyLabel: "初级", durationMinutes: 4, date: "2026/4/19", thumb: "street" },
  { id: "hotel-checkin", title: "酒店入住真实对话", description: "覆盖入住、确认房型、询问早餐和请求帮助。", source: "Travel Now", sourceType: "ai-dialogue", topic: "travel", topicLabel: "旅行", difficulty: "beginner", difficultyLabel: "初级", durationMinutes: 3, date: "2026/4/17", thumb: "travel" }
];

const tedLanguageVideos = [
  {
    id: "ted-learn-language",
    title: "4 个学习新语言的理由",
    speaker: "John McWhorter",
    coverFocus: "Why Languages Matter",
    portraitStyle: "scholar",
    description: "John McWhorter 从文化、思维和生活体验出发，解释为什么即使有翻译技术，人仍然值得学习一门新语言。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "语言学习",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 10,
    date: "2016/2",
    thumb: "ted-blue",
    featured: true,
    videoMode: "embed",
    subtitleUrl: "subtitles/ted-learn-language.vtt",
    embedUrl: "https://embed.ted.com/talks/john_mcwhorter_4_reasons_to_learn_a_new_language",
    sourceUrl: "https://www.ted.com/talks/john_mcwhorter_4_reasons_to_learn_a_new_language",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：不下载、不剪辑 TED 视频，仅嵌入官方播放器。",
    sentences: [
      { english: "English is fast becoming the world's universal language.", chinese: "英语正在快速成为世界通用语言。", note: "universal language 可用于讨论英语、科技和跨文化沟通。" },
      { english: "There are lots of reasons to learn another language.", chinese: "学习另一门语言有很多理由。", note: "There are lots of reasons to... 是演讲中展开观点的高频句型。" },
      { english: "Languages channel your thoughts.", chinese: "语言会引导你的思维方式。", note: "channel 在这里表示引导、塑造。" }
    ]
  },
  {
    id: "ted-chinese-ease",
    title: "轻松读懂中文的方式",
    speaker: "ShaoLan",
    coverFocus: "Visual Language",
    portraitStyle: "designer",
    description: "ShaoLan 用视觉化方式拆解汉字，适合练习解释概念、举例说明和教育类表达。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "语言学习",
    difficulty: "beginner",
    difficultyLabel: "初级",
    durationMinutes: 6,
    date: "2013/2",
    thumb: "ted-red",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/shaolan_learn_to_read_chinese_with_ease",
    sourceUrl: "https://www.ted.com/talks/shaolan_learn_to_read_chinese_with_ease",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：适合练习清晰解释和示例表达。",
    sentences: [
      { english: "Learning to speak Chinese is a hard task.", chinese: "学习说中文是一件困难的事。", note: "a hard task 是描述学习挑战的简洁表达。" },
      { english: "Let me show you how it works.", chinese: "让我向你展示它是如何运作的。", note: "show you how it works 适合讲解流程或方法。" },
      { english: "You can build more complex concepts from simple forms.", chinese: "你可以从简单形式构建更复杂的概念。", note: "build from... to... 适合解释学习路径。" }
    ]
  },
  {
    id: "ted-reading-world",
    title: "一年读遍世界各国的一本书",
    speaker: "Ann Morgan",
    coverFocus: "Read The World",
    portraitStyle: "reader",
    description: "Ann Morgan 分享跨文化阅读计划，适合训练讲故事、描述目标和表达文化视角。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "阅读表达",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 12,
    date: "2015/9",
    thumb: "ted-books",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/ann_morgan_my_year_reading_a_book_from_every_country_in_the_world",
    sourceUrl: "https://www.ted.com/talks/ann_morgan_my_year_reading_a_book_from_every_country_in_the_world",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：适合练习阅读、文化和个人挑战相关表达。",
    sentences: [
      { english: "I considered myself a fairly well-read person.", chinese: "我曾认为自己算是一个读书不少的人。", note: "consider myself... 适合自我介绍和观点铺垫。" },
      { english: "I had a massive blind spot on my bookshelf.", chinese: "我的书架上存在一个巨大的盲区。", note: "blind spot 可用于表达认知盲区。" },
      { english: "I decided to read a book from every country.", chinese: "我决定每个国家读一本书。", note: "decided to... 是讲述行动计划的基础结构。" }
    ]
  },
  {
    id: "ted-sign-language",
    title: "手语中迷人的音乐性",
    speaker: "Christine Sun Kim",
    coverFocus: "Sign & Sound",
    portraitStyle: "artist",
    description: "Christine Sun Kim 讨论声音、手语和表达方式，适合训练抽象概念、感官描述和文化理解。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "表达方式",
    difficulty: "advanced",
    difficultyLabel: "高级",
    durationMinutes: 15,
    date: "2015",
    thumb: "ted-sign",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/christine_sun_kim_the_enchanting_music_of_sign_language",
    sourceUrl: "https://www.ted.com/talks/christine_sun_kim_the_enchanting_music_of_sign_language",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：适合练习关于声音、身体语言和表达边界的英文。",
    sentences: [
      { english: "Sound is like money, power, control.", chinese: "声音就像金钱、权力和控制。", note: "Sound is like... 用类比方式引出抽象观点。" },
      { english: "Sign language has its own rhythm and music.", chinese: "手语有它自己的节奏和音乐性。", note: "has its own... 可用于强调独特性。" },
      { english: "I want to reclaim ownership of sound.", chinese: "我想重新取回对声音的拥有权。", note: "reclaim ownership of... 是强有力的观点表达。" }
    ]
  },
  {
    id: "ted-dont-insist-english",
    title: "不要只坚持英语",
    speaker: "Patricia Ryan",
    coverFocus: "English & Diversity",
    portraitStyle: "teacher",
    description: "Patricia Ryan 反思英语作为全球语言的影响，适合训练辩论、教育公平和语言政策表达。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "英语思辨",
    difficulty: "advanced",
    difficultyLabel: "高级",
    durationMinutes: 10,
    date: "2010",
    thumb: "ted-english",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/patricia_ryan_don_t_insist_on_english",
    sourceUrl: "https://www.ted.com/talks/patricia_ryan_don_t_insist_on_english",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：适合练习表达立场、提出反问和讨论英语学习的意义。",
    sentences: [
      { english: "English is an open door.", chinese: "英语是一扇打开的门。", note: "open door 可比喻机会和入口。" },
      { english: "But are we losing something important?", chinese: "但我们是否正在失去一些重要的东西？", note: "Are we losing...? 适合提出反思性问题。" },
      { english: "We need to celebrate diversity.", chinese: "我们需要赞美多样性。", note: "celebrate diversity 是教育和文化议题中的高频表达。" }
    ]
  },
  {
    id: "ted-language-money",
    title: "语言会影响你的储蓄能力吗",
    speaker: "Keith Chen",
    coverFocus: "Language Shapes Time",
    portraitStyle: "analyst",
    description: "Keith Chen 从语言结构谈经济行为，适合训练数据解释、因果关系和研究发现表达。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "语言与思维",
    difficulty: "advanced",
    difficultyLabel: "高级",
    durationMinutes: 12,
    date: "2012/6",
    thumb: "ted-data",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/keith_chen_could_your_language_affect_your_ability_to_save_money",
    sourceUrl: "https://www.ted.com/talks/keith_chen_could_your_language_affect_your_ability_to_save_money",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：适合练习研究类、数据类和比较类英文表达。",
    sentences: [
      { english: "Languages differ in how they divide up time.", chinese: "不同语言划分时间的方式不同。", note: "differ in how... 适合描述差异。" },
      { english: "This turns out to have surprising effects.", chinese: "结果证明这会产生令人意外的影响。", note: "turns out to... 常用于引出研究结果。" },
      { english: "The future feels more distant.", chinese: "未来感觉更遥远。", note: "feels more distant 可用于抽象感受描述。" }
    ]
  },
  {
    id: "ted-dont-kill-language",
    title: "不要杀死你的语言",
    speaker: "Suzanne Talhouk",
    coverFocus: "Identity & Mother Tongue",
    portraitStyle: "speaker",
    description: "Suzanne Talhouk 讨论母语、身份和文化表达，适合训练情感表达和价值观点。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "文化表达",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 14,
    date: "2012/12",
    thumb: "ted-culture",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/suzanne_talhouk_don_t_kill_your_language",
    sourceUrl: "https://www.ted.com/talks/suzanne_talhouk_don_t_kill_your_language",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：该演讲为阿拉伯语演讲，可结合字幕训练跨语言理解。",
    sentences: [
      { english: "Language is not just a tool.", chinese: "语言不只是一个工具。", note: "not just... 用于强调更深层意义。" },
      { english: "It carries our identity and memory.", chinese: "它承载着我们的身份和记忆。", note: "carry identity and memory 是文化讨论中的自然表达。" },
      { english: "We should not be ashamed of our language.", chinese: "我们不应该为自己的语言感到羞耻。", note: "be ashamed of... 用于表达羞耻或自我接纳。" }
    ]
  },
  {
    id: "ted-simplify-spelling",
    title: "我们应该简化拼写吗",
    speaker: "Karina Galperin",
    coverFocus: "Spelling Reform",
    portraitStyle: "writer",
    description: "Karina Galperin 讨论英语拼写规则和学习负担，适合训练提出问题、分析规则和表达建议。",
    source: "TED",
    sourceType: "ted",
    topic: "language",
    topicLabel: "拼写与规则",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 16,
    date: "2015",
    thumb: "ted-spelling",
    videoMode: "embed",
    embedUrl: "https://embed.ted.com/talks/karina_galperin_should_we_simplify_spelling",
    sourceUrl: "https://www.ted.com/talks/karina_galperin_should_we_simplify_spelling",
    attribution: "TED Talk，使用 TED 官方嵌入播放器并链接回 TED.com。",
    demoNote: "外部素材模式：适合练习关于英语拼写、规则和学习效率的表达。",
    sentences: [
      { english: "Spelling can be surprisingly hard to master.", chinese: "拼写可能出人意料地难以掌握。", note: "surprisingly hard to master 可用于描述学习难点。" },
      { english: "Language evolves over time.", chinese: "语言会随着时间演变。", note: "evolves over time 是语言变化主题的核心表达。" },
      { english: "Maybe it is time to rethink the rules.", chinese: "也许是时候重新思考这些规则了。", note: "It is time to rethink... 适合提出改革建议。" }
    ]
  }
];

videos.splice(0, videos.length, ...tedLanguageVideos);

const aiScenarios = [
  {
    id: "coffee",
    title: "咖啡店点单",
    meta: "初级 · 5分钟",
    goal: "完成一次自然点单",
    guidance: "说出饮品、冷热、尺寸，并回应店员追问。",
    opening: "Hi! What can I get for you today?",
    prompts: [
      "Sure. Would you like it hot or iced?",
      "What size would you like?",
      "Would you like that for here or to go?",
      "Great. Can I get your name for the order?"
    ],
    keywords: ["coffee", "latte", "iced", "hot", "medium", "small", "large", "to go", "please"],
    suggestion: "可以补充饮品尺寸和冷热，例如 “Can I get a medium iced latte to go?”"
  },
  {
    id: "hotel",
    title: "酒店入住",
    meta: "初级 · 6分钟",
    goal: "完成入住确认",
    guidance: "说明预订、姓名、房型，并礼貌询问早餐或退房时间。",
    opening: "Good evening. Welcome to SpeakFlow Hotel. Do you have a reservation?",
    prompts: [
      "May I have your name, please?",
      "Would you prefer a room on a higher floor?",
      "Breakfast is served from 7 to 10. Do you need anything else?",
      "Your room is ready. Could you confirm your email address?"
    ],
    keywords: ["reservation", "name", "room", "breakfast", "check-in", "passport", "please"],
    suggestion: "入住场景里可以主动说 “I have a reservation under...” 来表达更完整。"
  },
  {
    id: "meeting",
    title: "英文会议接话",
    meta: "中级 · 8分钟",
    goal: "完成一次会议回应",
    guidance: "练习确认信息、表达赞同、补充观点或提出顾虑。",
    opening: "Before we move on, what do you think about the timeline?",
    prompts: [
      "That makes sense. Could you explain your main concern?",
      "How would you suggest we adjust the plan?",
      "Can you summarize the next step?",
      "Would you be comfortable sharing that with the team?"
    ],
    keywords: ["timeline", "concern", "agree", "suggest", "next step", "plan", "numbers"],
    suggestion: "会议回应可以用 “That makes sense, but I have one concern...” 更自然地接话。"
  },
  {
    id: "interview",
    title: "面试自我介绍",
    meta: "中级 · 8分钟",
    goal: "完成一段清晰自我介绍",
    guidance: "介绍背景、经验、优势，并把回答落到岗位相关能力。",
    opening: "Thanks for coming in today. Could you briefly introduce yourself?",
    prompts: [
      "What project are you most proud of?",
      "How do you usually handle pressure at work?",
      "Why are you interested in this role?",
      "What would you like to improve next?"
    ],
    keywords: ["experience", "project", "team", "role", "strength", "learn", "improve"],
    suggestion: "面试回答建议包含背景、具体项目和你能带来的价值。"
  }
];

let activeAiScenarioId = "coffee";
let aiMessages = [];
let activeTipsVideoId = "meeting-follow-up";
let activeExpressionTab = "words";
let activeExpressionFilter = "all";
let tipsChineseVisible = true;

const expressionLibrary = {
  "meeting-follow-up": {
    summary: "职场会议片段，重点练习确认信息、表达顾虑和推动下一步。",
    words: [
      { term: "timeline", phonetic: "/ˈtaɪmlaɪn/", cn: "时间线；进度安排", en: "schedule, sequence", example: "I just want to make sure I understand the timeline.", exampleCn: "我只是想确认一下我理解的时间线是对的。", status: "unmarked" },
      { term: "concern", phonetic: "/kənˈsɜːrn/", cn: "顾虑；担心", en: "worry, issue", example: "That makes sense, but I have one concern.", exampleCn: "这说得通，不过我有一个顾虑。", status: "known" },
      { term: "revisit", phonetic: "/ˌriːˈvɪzɪt/", cn: "重新讨论；再次查看", en: "return to, discuss again", example: "Could we revisit this after we check the numbers?", exampleCn: "我们核对数据之后，能不能再回来看这个问题？", status: "unknown" }
    ],
    phrases: [
      { term: "make sure I understand", phonetic: "", cn: "确认我理解正确", en: "confirm my understanding", example: "I just want to make sure I understand the timeline.", exampleCn: "我只是想确认一下时间线。" },
      { term: "That makes sense, but...", phonetic: "", cn: "这说得通，不过……", en: "polite disagreement starter", example: "That makes sense, but I have one concern.", exampleCn: "这说得通，不过我有一个顾虑。" },
      { term: "after we check the numbers", phonetic: "", cn: "在我们核对数据之后", en: "after verifying the data", example: "Could we revisit this after we check the numbers?", exampleCn: "我们核对数据之后再看这个问题好吗？" }
    ],
    native: [
      { term: "I have one concern.", phonetic: "", cn: "我有一个顾虑。", en: "soft way to raise a disagreement", example: "That makes sense, but I have one concern.", exampleCn: "这说得通，不过我有一个顾虑。" },
      { term: "Could we revisit this...?", phonetic: "", cn: "我们能不能稍后再讨论这个？", en: "meeting-friendly way to defer a decision", example: "Could we revisit this after we check the numbers?", exampleCn: "我们核对数据之后，能不能再回来看这个问题？" }
    ]
  },
  "hotel-checkin": {
    summary: "旅行入住场景，重点练习预订、房型、早餐和礼貌请求。",
    words: [
      { term: "reservation", phonetic: "/ˌrezərˈveɪʃn/", cn: "预订", en: "booking", example: "I have a reservation under Li.", exampleCn: "我用 Li 的名字预订了。", status: "unmarked" },
      { term: "available", phonetic: "/əˈveɪləbl/", cn: "可用的；有空的", en: "free, ready", example: "Is a higher floor available?", exampleCn: "有高楼层房间吗？", status: "unknown" }
    ],
    phrases: [
      { term: "under the name...", phonetic: "", cn: "以……的名字", en: "booking name expression", example: "The reservation is under the name Li.", exampleCn: "预订人姓名是 Li。" },
      { term: "Would it be possible to...?", phonetic: "", cn: "是否可以……？", en: "polite request", example: "Would it be possible to check out late?", exampleCn: "是否可以晚一点退房？" }
    ],
    native: [
      { term: "I have a reservation under...", phonetic: "", cn: "我用……的名字订了房。", en: "natural hotel check-in opener", example: "Hi, I have a reservation under Li.", exampleCn: "你好，我用 Li 的名字订了房。" }
    ]
  }
};

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function getAiSession() {
  try {
    return JSON.parse(localStorage.getItem(AI_SESSION_KEY)) || {};
  } catch {
    return {};
  }
}

function setAiSession(session) {
  localStorage.setItem(AI_SESSION_KEY, JSON.stringify(session));
}

function getScenarioById(scenarioId) {
  return aiScenarios.find((scenario) => scenario.id === scenarioId) || aiScenarios[0];
}

function getScenarioMessages(scenarioId) {
  const session = getAiSession();
  const scenario = getScenarioById(scenarioId);
  return session[scenarioId] || [{ role: "ai", text: scenario.opening }];
}

function saveScenarioMessages(scenarioId, messages) {
  const session = getAiSession();
  session[scenarioId] = messages;
  setAiSession(session);
}

function setFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getProgress() {
  const defaults = {
    practicedSentences: {},
    shadowingCounts: {},
    aiScores: [],
    aiPracticeCounts: {},
    aiScenarioHistory: [],
    completedVideos: [],
    checkins: [],
    recentLearning: []
  };

  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(PROGRESS_KEY)) };
  } catch {
    return defaults;
  }
}

function setProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function unique(values) {
  return [...new Set(values)];
}

function recordSentencePractice(videoId, sentenceIndex) {
  const progress = getProgress();
  const date = todayKey();
  const current = progress.practicedSentences[date] || [];
  progress.practicedSentences[date] = unique([...current, `${videoId}:${sentenceIndex}`]);
  setProgress(progress);
}

function recordShadowing(videoId) {
  const progress = getProgress();
  const date = todayKey();
  progress.shadowingCounts[date] = (progress.shadowingCounts[date] || 0) + 1;
  progress.aiScores = [...progress.aiScores, { date, source: "shadowing", videoId, score: 82 }].slice(-30);
  setProgress(progress);
}

function recordAiPractice(scenario, score) {
  const progress = getProgress();
  const date = todayKey();
  progress.aiPracticeCounts[date] = (progress.aiPracticeCounts[date] || 0) + 1;
  progress.aiScores = [...progress.aiScores, { date, source: "ai-practice", scenarioId: scenario.id, score }].slice(-30);
  progress.aiScenarioHistory = [
    { date, scenarioId: scenario.id, title: scenario.title, score },
    ...progress.aiScenarioHistory
  ].slice(0, 8);
  progress.recentLearning = [
    { date, videoId: `ai-${scenario.id}`, title: `AI陪练：${scenario.title}` },
    ...progress.recentLearning.filter((item) => item.videoId !== `ai-${scenario.id}`)
  ].slice(0, 5);
  setProgress(progress);
}

function completeCheckin(video) {
  const progress = getProgress();
  const date = todayKey();
  progress.checkins = unique([...progress.checkins, date]).sort();
  progress.completedVideos = unique([...progress.completedVideos, video.id]);
  progress.recentLearning = [
    { date, videoId: video.id, title: video.title },
    ...progress.recentLearning.filter((item) => item.videoId !== video.id)
  ].slice(0, 5);
  setProgress(progress);
}

function getTodayProgress() {
  const progress = getProgress();
  const date = todayKey();
  return {
    sentenceCount: (progress.practicedSentences[date] || []).length,
    shadowingCount: progress.shadowingCounts[date] || 0,
    aiPracticeCount: progress.aiPracticeCounts[date] || 0,
    hasAiScore: progress.aiScores.some((item) => item.date === date),
    hasCheckin: progress.checkins.includes(date)
  };
}

function getAverageScore() {
  const scores = getProgress().aiScores;
  if (!scores.length) return null;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / scores.length);
}

function getStreakDays() {
  const checkins = new Set(getProgress().checkins);
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!checkins.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function renderTodayProgress() {
  const stats = document.querySelector("#today-stats");
  const tasks = document.querySelector("#today-task-list");
  if (!stats || !tasks) return;

  const today = getTodayProgress();
  const averageScore = getAverageScore();
  stats.innerHTML = `
    <div class="stat-item primary"><strong>${getStreakDays()}</strong><span>连续打卡</span></div>
    <div class="stat-item"><strong>${today.sentenceCount}</strong><span>今日句子</span></div>
    <div class="stat-item"><strong>${averageScore || "--"}</strong><span>平均评分</span></div>
  `;

  const taskItems = [
    { done: today.sentenceCount >= 3, text: `精听 3 个关键句（${Math.min(today.sentenceCount, 3)}/3）` },
    { done: today.shadowingCount >= 1, text: `完成 1 次跟读录音（${Math.min(today.shadowingCount, 1)}/1）` },
    { done: today.hasAiScore, text: "获得一次 AI 评分" },
    { done: today.hasCheckin, text: "完成今日打卡" }
  ];

  tasks.innerHTML = taskItems.map((item) => `
    <li class="${item.done ? "done" : ""}"><span></span>${item.text}</li>
  `).join("");
}

function isFavorite(videoId) {
  return getFavorites().includes(videoId);
}

function toggleFavorite(videoId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(videoId)
    ? favorites.filter((id) => id !== videoId)
    : [...favorites, videoId];
  setFavorites(nextFavorites);
  renderCurrentPage();
}

function getVideoById(videoId) {
  return videos.find((video) => video.id === videoId) || videos[0];
}

function getCurrentVideo() {
  const params = new URLSearchParams(window.location.search);
  return getVideoById(params.get("video"));
}

function getDurationBucket(video) {
  if (video.durationMinutes <= 3) return "short";
  if (video.durationMinutes <= 8) return "medium";
  return "long";
}

function getVideoLearningState(video) {
  const progress = getProgress();
  if (progress.completedVideos.includes(video.id)) {
    return { label: "已完成", className: "completed" };
  }

  const hasPracticed = Object.values(progress.practicedSentences)
    .some((items) => items.some((item) => item.startsWith(`${video.id}:`)));
  if (hasPracticed) {
    return { label: "学习中", className: "active" };
  }

  return { label: "未开始", className: "new" };
}

function getLibrarySearchText() {
  return document.querySelector("#library-search")?.value.trim().toLowerCase() || "";
}

function matchesSearch(video, searchText) {
  if (!searchText) return true;
  return [
    video.title,
    video.description,
    video.source,
    video.topicLabel,
    video.difficultyLabel
  ].some((value) => value.toLowerCase().includes(searchText));
}

function updateLibrarySummary(filteredVideos) {
  const summary = document.querySelector("#library-summary");
  if (!summary) return;

  const favorites = filteredVideos.filter((video) => isFavorite(video.id)).length;
  const completed = filteredVideos.filter((video) => getProgress().completedVideos.includes(video.id)).length;
  summary.textContent = `当前显示 ${filteredVideos.length} 个片段；${favorites} 个已收藏，${completed} 个已完成。`;
}

function getSpeakerInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "SF";
}

function renderVideoPreview(video, extraClass = "") {
  const className = `thumb ${extraClass} ${video.thumb} ${video.videoMode === "embed" ? "has-media" : ""}`.trim();
  const duration = `<span>${video.durationMinutes}分钟</span>`;

  if (video.videoMode === "embed" && video.embedUrl) {
    return `
      <div class="${className}" aria-label="${video.title} 视频封面">
        <div class="ted-cover-poster">
          <div class="speaker-portrait ${video.portraitStyle || "speaker"}" aria-hidden="true"><i>${getSpeakerInitials(video.speaker)}</i></div>
          <strong>${video.speaker || "Speaker"}</strong>
          <small>${video.topicLabel}</small>
          <b>${video.coverFocus || video.title}</b>
          <em>${video.difficultyLabel} · ${video.durationMinutes} 分钟</em>
        </div>
        ${duration}
      </div>
    `;
  }

  return `<div class="${className}">${duration}</div>`;
}

function createVideoCard(video, options = {}) {
  const favorite = isFavorite(video.id);
  const status = favorite ? "已收藏" : "收藏";
  const favoriteClass = favorite ? "favorite-button active" : "favorite-button";
  const learningState = getVideoLearningState(video);
  const sentenceCount = (video.sentences || videos[0].sentences || []).length;

  return `
    <article class="video-card" data-video-id="${video.id}">
      ${renderVideoPreview(video)}
      <div class="card-body">
        <div class="video-meta-row">
          <span class="learning-state ${learningState.className}">${learningState.label}</span>
          <span>${sentenceCount} 句精听</span>
        </div>
        <div class="card-title-row">
          <h2>${video.title}</h2>
          <button class="${favoriteClass}" type="button" data-favorite="${video.id}" aria-label="${status}${video.title}">${status}</button>
        </div>
        <p>${options.context || video.description}</p>
        <div class="tag-row"><span>${video.source}</span><span>${video.topicLabel}</span><span>${video.difficultyLabel}</span></div>
        <div class="card-foot"><strong>${video.durationMinutes} 分钟</strong><a href="learn.html?video=${video.id}">进入学习</a></div>
      </div>
    </article>
  `;
}

function bindFavoriteButtons() {
  document.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(button.dataset.favorite));
  });
}

function renderTodayPick() {
  const pick = videos.find((video) => video.featured) || videos[0];
  const container = document.querySelector("#today-pick");
  if (!container) return;

  container.innerHTML = `
    ${renderVideoPreview(pick, "today-cover")}
    <div class="today-copy">
      <p class="eyebrow">Today's Pick</p>
      <h2>${pick.title}</h2>
      <p>${pick.description}</p>
      <div class="tag-row"><span>${pick.source}</span><span>${pick.topicLabel}</span><span>${pick.difficultyLabel}</span></div>
      <div class="inline-actions">
        <a class="button primary" href="learn.html?video=${pick.id}">进入学习</a>
        <button class="${isFavorite(pick.id) ? "favorite-button active" : "favorite-button"}" type="button" data-favorite="${pick.id}">
          ${isFavorite(pick.id) ? "已收藏" : "收藏"}
        </button>
      </div>
    </div>
  `;
}

function getFilters() {
  const filters = {};
  document.querySelectorAll("[data-filter]").forEach((select) => {
    filters[select.dataset.filter] = select.value;
  });
  return filters;
}

function matchesFilters(video, filters) {
  return Object.entries(filters).every(([key, value]) => {
    if (value === "all") return true;
    if (key === "duration") return getDurationBucket(video) === value;
    return video[key] === value;
  });
}

function renderLibrary() {
  renderTodayProgress();
  renderTodayPick();
  const grid = document.querySelector("#video-grid");
  if (!grid) return;

  const searchText = getLibrarySearchText();
  const filteredVideos = videos.filter((video) => matchesFilters(video, getFilters()) && matchesSearch(video, searchText));
  updateLibrarySummary(filteredVideos);
  grid.innerHTML = filteredVideos.length
    ? filteredVideos.map((video) => createVideoCard(video)).join("")
    : `<article class="video-card empty-state"><div class="card-body"><h2>没有找到合适的视频</h2><p>换一个关键词或筛选条件，继续找今天适合训练的片段。</p></div></article>`;

  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.onchange = renderLibrary;
  });
  const searchInput = document.querySelector("#library-search");
  if (searchInput) searchInput.oninput = renderLibrary;
  bindFavoriteButtons();
}

function renderFavorites() {
  const grid = document.querySelector("#favorites-grid");
  if (!grid) return;

  const favoriteVideos = videos.filter((video) => getFavorites().includes(video.id));
  grid.innerHTML = favoriteVideos.length
    ? favoriteVideos.map((video) => createVideoCard(video, { context: `已收藏 · ${video.topicLabel} · 适合反复训练` })).join("")
    : `<article class="video-card empty-state"><div class="card-body"><h2>还没有收藏视频</h2><p>回到视频库，点击视频卡片上的“收藏”，这里会自动显示你的复习清单。</p><a class="button secondary" href="index.html">浏览视频</a></div></article>`;
  bindFavoriteButtons();
}

function renderVideoPlayer(video) {
  if (video.videoMode === "embed" && video.embedUrl) {
    return `
      <iframe
        class="player media-player embed-player ${video.thumb}"
        src="${video.embedUrl}"
        title="${video.title}"
        allow="fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    `;
  }

  if (video.videoUrl) {
    return `
      <video class="player media-player ${video.thumb}" controls preload="metadata" poster="">
        <source src="${video.videoUrl}" type="${video.videoType || "video/mp4"}">
        当前浏览器无法播放该 demo 视频。
      </video>
    `;
  }

  return `<div class="player ${video.thumb}"></div>`;
}

function renderSourceAttribution(video) {
  if (!video.attribution && !video.sourceUrl) return "";
  return `
    <p class="source-attribution">
      ${video.attribution || "外部素材"}
      ${video.sourceUrl ? `<a href="${video.sourceUrl}" target="_blank" rel="noopener noreferrer">查看原始来源</a>` : ""}
    </p>
  `;
}

const wordGlossary = {
  english: { cn: "英语；英文", type: "noun", usage: "谈论语言学习、国际沟通或英语环境时的核心词。" },
  language: { cn: "语言", type: "noun", usage: "可指某一种语言，也可泛指表达系统。" },
  languages: { cn: "语言；多种语言", type: "noun", usage: "复数形式，常用于比较不同语言或讨论语言多样性。" },
  universal: { cn: "通用的；普遍的", type: "adj.", usage: "强调适用于很多地区、人群或场景。" },
  reasons: { cn: "理由；原因", type: "noun", usage: "用于列举观点，常见结构是 reasons to do something。" },
  learn: { cn: "学习", type: "verb", usage: "后面可直接接语言、技能或方法。" },
  another: { cn: "另一；又一", type: "determiner", usage: "强调在已有对象之外再增加一个。" },
  channel: { cn: "引导；塑造", type: "verb", usage: "本句中不是频道，而是表达语言会影响思维路径。" },
  thoughts: { cn: "想法；思维", type: "noun", usage: "常用于讨论观点、认知和内心活动。" },
  speak: { cn: "说；讲话", type: "verb", usage: "可用于语言能力，也可用于公开表达。" },
  chinese: { cn: "中文；中国的", type: "noun/adj.", usage: "根据语境可指语言，也可作形容词。" },
  task: { cn: "任务；工作", type: "noun", usage: "a hard task 表示一件有挑战的事。" },
  show: { cn: "展示；说明", type: "verb", usage: "Let me show you... 是讲解型表达的自然开头。" },
  works: { cn: "运作；起作用", type: "verb", usage: "how it works 用来解释机制或方法。" },
  build: { cn: "构建；建立", type: "verb", usage: "可用于抽象概念、能力和系统。" },
  complex: { cn: "复杂的", type: "adj.", usage: "用来描述概念、问题或结构。" },
  concepts: { cn: "概念", type: "noun", usage: "教育、解释和思维类话题常用词。" },
  considered: { cn: "认为；把……看作", type: "verb", usage: "consider myself... 适合表达自我认知。" },
  fairly: { cn: "相当；还算", type: "adv.", usage: "用于缓和语气，让判断不显得绝对。" },
  read: { cn: "阅读；读过", type: "verb/adj.", usage: "well-read 表示博览群书的。" },
  massive: { cn: "巨大的", type: "adj.", usage: "比 big 更正式、更有强调感。" },
  blind: { cn: "盲的；看不见的", type: "adj.", usage: "blind spot 表示认知盲区。" },
  spot: { cn: "点；位置", type: "noun", usage: "blind spot 是固定搭配。" },
  bookshelf: { cn: "书架", type: "noun", usage: "这里用书架比喻阅读范围。" },
  decided: { cn: "决定了", type: "verb", usage: "decided to... 用于讲述行动计划。" },
  country: { cn: "国家", type: "noun", usage: "every country 表示覆盖所有国家。" },
  sound: { cn: "声音", type: "noun", usage: "可指物理声音，也可延伸到表达权力。" },
  money: { cn: "金钱", type: "noun", usage: "用于类比资源、权力或控制。" },
  power: { cn: "权力；力量", type: "noun", usage: "抽象议题中常与 control 搭配。" },
  control: { cn: "控制", type: "noun/verb", usage: "表示支配、影响或管理能力。" },
  sign: { cn: "手势；符号", type: "noun", usage: "sign language 指手语。" },
  rhythm: { cn: "节奏", type: "noun", usage: "常用于声音、语言、动作和音乐。" },
  music: { cn: "音乐；音乐性", type: "noun", usage: "这里强调手语也有节奏美感。" },
  reclaim: { cn: "重新取回", type: "verb", usage: "常用于权利、身份或话语权。" },
  ownership: { cn: "拥有权；归属感", type: "noun", usage: "reclaim ownership of... 是强观点表达。" },
  door: { cn: "门；机会", type: "noun", usage: "open door 可比喻机会入口。" },
  losing: { cn: "正在失去", type: "verb", usage: "Are we losing...? 用于反思性提问。" },
  important: { cn: "重要的", type: "adj.", usage: "用于强调价值或优先级。" },
  celebrate: { cn: "赞美；庆祝", type: "verb", usage: "celebrate diversity 表示认可多样性。" },
  diversity: { cn: "多样性", type: "noun", usage: "文化和教育话题中的高频词。" },
  differ: { cn: "不同；有差异", type: "verb", usage: "differ in how... 用于描述机制差异。" },
  divide: { cn: "划分；分割", type: "verb", usage: "divide up time 表示划分时间。" },
  time: { cn: "时间", type: "noun", usage: "语言与思维话题中的核心抽象词。" },
  surprising: { cn: "令人意外的", type: "adj.", usage: "用于引出超出预期的结果。" },
  effects: { cn: "影响；效果", type: "noun", usage: "研究类表达常用词。" },
  future: { cn: "未来", type: "noun", usage: "可讨论计划、时间感或可能性。" },
  distant: { cn: "遥远的", type: "adj.", usage: "可指空间距离，也可指心理距离。" },
  tool: { cn: "工具", type: "noun", usage: "not just a tool 用来强调更深层价值。" },
  carries: { cn: "承载；携带", type: "verb", usage: "可用于身份、记忆、意义等抽象对象。" },
  identity: { cn: "身份；认同", type: "noun", usage: "文化和语言议题中的核心词。" },
  memory: { cn: "记忆", type: "noun", usage: "可指个人记忆或集体记忆。" },
  ashamed: { cn: "羞愧的", type: "adj.", usage: "be ashamed of... 表示为某事羞愧。" },
  spelling: { cn: "拼写", type: "noun", usage: "讨论英语规则和学习负担时使用。" },
  surprisingly: { cn: "出人意料地", type: "adv.", usage: "用来强调结果或难度超出预期。" },
  hard: { cn: "困难的", type: "adj.", usage: "hard to master 表示难以掌握。" },
  master: { cn: "掌握", type: "verb", usage: "常用于技能、语言、方法的熟练掌握。" },
  evolves: { cn: "演变；进化", type: "verb", usage: "language evolves over time 是讨论语言变化的自然表达。" },
  rethink: { cn: "重新思考", type: "verb", usage: "rethink the rules 用于提出改革或反思。" },
  rules: { cn: "规则", type: "noun", usage: "可指语法、拼写、制度或方法规则。" }
};

function normalizeWord(word) {
  return word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, "");
}

function buildWordItems(sentence) {
  if (sentence.words?.length) return sentence.words;

  return sentence.english
    .split(/\s+/)
    .map((raw) => {
      const key = normalizeWord(raw);
      const fallback = { cn: "结合本句理解", type: "word", usage: "后续可补充更精确的逐词解析。" };
      return {
        text: raw.replace(/[.,?!:;]+$/g, ""),
        ...(wordGlossary[key] || fallback),
        key
      };
    })
    .filter((item) => item.key);
}

function renderWordPrecision(sentences, sentenceIndex = 0, wordIndex = 0) {
  const sentence = sentences[sentenceIndex] || sentences[0];
  const words = buildWordItems(sentence);
  const activeWord = words[wordIndex] || words[0];

  return `
    <section class="word-precision" id="word-precision">
      <div class="word-precision-head">
        <p class="eyebrow">Word Precision</p>
        <h2>逐词精度</h2>
      </div>
      <p class="word-sentence">${sentence.english}</p>
      <div class="word-grid">
        ${words.map((word, index) => `
          <button class="word-chip ${index === wordIndex ? "active" : ""}" type="button" data-word-index="${index}">
            <strong>${word.text}</strong>
            <span>${word.cn}</span>
          </button>
        `).join("")}
      </div>
      <article class="word-detail" id="word-detail">
        <span>${activeWord.type}</span>
        <h3>${activeWord.text}</h3>
        <strong>${activeWord.cn}</strong>
        <p>${activeWord.usage}</p>
      </article>
    </section>
  `;
}

function bindWordPrecision(sentences, sentenceIndex = 0) {
  document.querySelectorAll("[data-word-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const wordIndex = Number(button.dataset.wordIndex);
      document.querySelector("#word-precision").outerHTML = renderWordPrecision(sentences, sentenceIndex, wordIndex);
      bindWordPrecision(sentences, sentenceIndex);
    });
  });
}

function parseVttTimestamp(timestamp) {
  const parts = timestamp.trim().split(":");
  const secondsPart = parts.pop() || "0";
  const seconds = Number(secondsPart.replace(",", "."));
  const minutes = Number(parts.pop() || 0);
  const hours = Number(parts.pop() || 0);
  return Math.round(hours * 3600 + minutes * 60 + seconds);
}

function formatSubtitleTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function parseVtt(text) {
  return text
    .replace(/\r/g, "")
    .split(/\n\n+/)
    .map((block) => block.split("\n").filter(Boolean))
    .map((lines) => {
      const timingIndex = lines.findIndex((line) => line.includes("-->"));
      if (timingIndex === -1) return null;

      const [startRaw, endRaw] = lines[timingIndex].split("-->").map((part) => part.trim().split(/\s+/)[0]);
      const cueLines = lines.slice(timingIndex + 1);
      const english = cueLines.find((line) => line.startsWith("EN:"))?.replace(/^EN:\s*/, "") || cueLines[0] || "";
      const chinese = cueLines.find((line) => line.startsWith("ZH:"))?.replace(/^ZH:\s*/, "") || cueLines[1] || "";
      if (!english) return null;

      return {
        start: formatSubtitleTime(parseVttTimestamp(startRaw)),
        end: formatSubtitleTime(parseVttTimestamp(endRaw)),
        english,
        chinese,
        note: "来自本地 VTT 字幕文件，可继续补充重点表达。"
      };
    })
    .filter(Boolean);
}

async function loadSubtitles(video) {
  if (!video.subtitleUrl) return video.sentences || videos[0].sentences;

  try {
    const response = await fetch(video.subtitleUrl);
    if (!response.ok) throw new Error("subtitle not found");
    const subtitles = parseVtt(await response.text());
    return subtitles.length ? subtitles : (video.sentences || videos[0].sentences);
  } catch {
    return video.sentences || videos[0].sentences;
  }
}

function getSentenceTime(sentence, index) {
  return sentence.start || `0:${String(index * 7 + 1).padStart(2, "0")}`;
}

function renderSubtitleList(sentences) {
  return sentences.map((sentence, index) => `
    <button class="sentence ${index === 0 ? "active" : ""}" type="button" data-sentence="${index}">
      <time>${getSentenceTime(sentence, index)}</time>
      <strong>${sentence.english}</strong>
      <span>${sentence.chinese}</span>
      <em class="sentence-star">☆</em>
    </button>
  `).join("");
}

function renderLearnPage() {
  const video = getCurrentVideo();
  const sentences = video.sentences || videos[0].sentences;
  const videoPanel = document.querySelector("#learn-video");
  const sentencePanel = document.querySelector("#learn-sentences");
  const feedbackPanel = document.querySelector("#learn-feedback");
  if (!videoPanel || !sentencePanel || !feedbackPanel) return;

  videoPanel.innerHTML = `
    <div class="learn-video-card">
      <div class="learn-video-head">
        <a class="learn-back" href="index.html" aria-label="返回视频库">‹</a>
        <h1>${video.title}</h1>
        <div class="learn-meta"><span>时长: ${video.durationMinutes}:00</span><span>难度: ${video.difficultyLabel}</span></div>
      </div>
      <div class="learn-player-frame">${renderVideoPlayer(video)}</div>
    </div>
    <section class="video-summary-card">
      <h2><span>▰</span>视频简介</h2>
      <p>${video.description}</p>
      ${video.demoNote ? `<p class="demo-note">${video.demoNote}</p>` : ""}
      ${renderSourceAttribution(video)}
    </section>
  `;

  sentencePanel.innerHTML = `
    <div class="subtitle-head">
      <h1>动态字幕</h1>
      <div class="subtitle-tools" aria-label="字幕工具">
        <button type="button" title="翻译">文</button>
        <button type="button" title="循环">↻</button>
        <button type="button" title="筛选">≡</button>
        <button type="button" title="生词本">▯</button>
        <button type="button" title="导出">⇲</button>
      </div>
    </div>
    <div class="sentence-scroll" id="sentence-scroll">
      ${renderSubtitleList(sentences)}
    </div>
    <button class="auto-scroll-button" type="button">▣ 自动</button>
  `;

  feedbackPanel.innerHTML = `
    <p class="eyebrow">Shadowing</p>
    <h2>跟读录音</h2>
    <p id="current-sentence">当前句：${sentences[0].english}</p>
    <button class="button primary record-button" type="button" data-shadowing="${video.id}">开始录音</button>
    <div class="score-box"><strong>82</strong><span>AI 评分</span></div>
    <p class="feedback-text">你基本读完整了句子，但需要更注意连读和句尾清晰度。</p>
    <div class="lesson-note compact-note"><h2>重点表达</h2><p id="sentence-note">${sentences[0].note}</p></div>
    <p class="progress-note" id="learn-progress-note">${getLearnProgressText(video.id)}</p>
    <div class="inline-actions">
      <button class="${isFavorite(video.id) ? "favorite-button active" : "favorite-button"}" type="button" data-favorite="${video.id}">
        ${isFavorite(video.id) ? "已收藏" : "收藏视频"}
      </button>
      <button class="button secondary" type="button" data-checkin="${video.id}">完成打卡</button>
    </div>
  `;

  document.querySelectorAll(".sentence").forEach((sentenceButton) => {
    sentenceButton.addEventListener("click", () => {
      const index = Number(sentenceButton.dataset.sentence);
      document.querySelectorAll(".sentence").forEach((item) => item.classList.remove("active"));
      sentenceButton.classList.add("active");
      document.querySelector("#current-sentence").textContent = `当前句：${sentences[index].english}`;
      document.querySelector("#sentence-note").textContent = sentences[index].note;
      recordSentencePractice(video.id, index);
      updateLearnProgressView(video.id);
    });
  });

  bindFavoriteButtons();
  bindLearningActions(video);
  hydrateSubtitles(video);
}

async function hydrateSubtitles(video) {
  const loadedSentences = await loadSubtitles(video);
  const scroll = document.querySelector("#sentence-scroll");
  if (!scroll) return;

  scroll.innerHTML = renderSubtitleList(loadedSentences);
  const currentSentence = document.querySelector("#current-sentence");
  const sentenceNote = document.querySelector("#sentence-note");
  if (currentSentence) currentSentence.textContent = `当前句：${loadedSentences[0].english}`;
  if (sentenceNote) sentenceNote.textContent = loadedSentences[0].note || "";

  document.querySelectorAll(".sentence").forEach((sentenceButton) => {
    sentenceButton.addEventListener("click", () => {
      const index = Number(sentenceButton.dataset.sentence);
      document.querySelectorAll(".sentence").forEach((item) => item.classList.remove("active"));
      sentenceButton.classList.add("active");
      document.querySelector("#current-sentence").textContent = `当前句：${loadedSentences[index].english}`;
      document.querySelector("#sentence-note").textContent = loadedSentences[index].note || "";
      recordSentencePractice(video.id, index);
      updateLearnProgressView(video.id);
    });
  });
}

function getLearnProgressText(videoId) {
  const today = getTodayProgress();
  const progress = getProgress();
  const date = todayKey();
  const sentenceCount = (progress.practicedSentences[date] || [])
    .filter((item) => item.startsWith(`${videoId}:`)).length;
  const status = today.hasCheckin ? "今日已打卡" : "今日未打卡";
  return `${status} · 本视频今日已精听 ${sentenceCount} 句 · 跟读 ${today.shadowingCount} 次`;
}

function bindLearningActions(video) {
  const shadowingButton = document.querySelector("[data-shadowing]");
  if (shadowingButton) {
    shadowingButton.addEventListener("click", () => {
      recordShadowing(video.id);
      updateLearnProgressView(video.id);
    });
  }

  const checkinButton = document.querySelector("[data-checkin]");
  if (checkinButton) {
    checkinButton.addEventListener("click", () => {
      completeCheckin(video);
      updateLearnProgressView(video.id);
      checkinButton.textContent = "今日已打卡";
    });
  }
}

function updateLearnProgressView(videoId) {
  const note = document.querySelector("#learn-progress-note");
  if (note) note.textContent = getLearnProgressText(videoId);
}

function renderProfile() {
  const container = document.querySelector("#member-records");
  if (!container) return;

  const progress = getProgress();
  const today = getTodayProgress();
  const averageScore = getAverageScore();
  const recent = progress.recentLearning.length
    ? progress.recentLearning.map((item) => item.title).join(" · ")
    : "还没有完成打卡，先从一个视频开始。";

  container.innerHTML = `
    <article class="record-card"><h2>连续打卡</h2><strong>${getStreakDays()} 天</strong><p>${today.hasCheckin ? "今天已完成打卡。" : "今天还没有打卡。"}</p></article>
    <article class="record-card"><h2>总学习天数</h2><strong>${progress.checkins.length} 天</strong><p>按完成打卡的日期累计。</p></article>
    <article class="record-card"><h2>完成视频</h2><strong>${progress.completedVideos.length} 个</strong><p>完成打卡的视频会计入这里。</p></article>
    <article class="record-card"><h2>AI 平均分</h2><strong>${averageScore || "--"}</strong><p>${averageScore ? "由跟读和 AI 陪练评分计算。" : "完成一次跟读或陪练后生成评分。"}</p></article>
    <article class="record-card wide-record"><h2>最近学习</h2><p>${recent}</p></article>
    <article class="record-card wide-record"><h2>今日进度</h2><p>精听 ${today.sentenceCount} 句 · 跟读 ${today.shadowingCount} 次 · AI 陪练 ${today.aiPracticeCount} 轮 · ${today.hasAiScore ? "已获得 AI 评分" : "未获得 AI 评分"}</p></article>
  `;
}

function scoreAiReply(text, scenario) {
  const normalized = text.toLowerCase();
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  const keywordHits = scenario.keywords.filter((keyword) => normalized.includes(keyword)).length;
  const politeness = /\b(please|thanks|thank you|could|would|may i|can i)\b/.test(normalized) ? 8 : 0;
  const score = Math.min(96, 58 + Math.min(wordCount, 18) + keywordHits * 5 + politeness);

  let feedback = scenario.suggestion;
  if (wordCount < 5) {
    feedback = "可以再补充一点信息，让回答更像真实对话中的完整句。";
  } else if (keywordHits >= 2 && politeness) {
    feedback = "表达比较完整，也有礼貌用语。下一步可以继续补充原因或具体细节。";
  } else if (keywordHits >= 1) {
    feedback = "你已经抓住了场景关键词，可以再加入礼貌表达或更完整的请求。";
  }

  return { score, feedback, keywordHits };
}

function getNextAiPrompt(scenario, userMessageCount) {
  return scenario.prompts[(userMessageCount - 1) % scenario.prompts.length];
}

function renderAiPage() {
  const scenario = getScenarioById(activeAiScenarioId);
  aiMessages = getScenarioMessages(scenario.id);
  renderAiScenarios();
  renderAiChat(scenario);
  renderAiFeedback(scenario);
}

function renderAiScenarios() {
  const container = document.querySelector("#ai-scenarios");
  if (!container) return;

  container.innerHTML = `
    <h2>场景</h2>
    ${aiScenarios.map((scenario) => `
      <button class="scenario ${scenario.id === activeAiScenarioId ? "active" : ""}" type="button" data-ai-scenario="${scenario.id}">
        ${scenario.title}<span>${scenario.meta}</span>
      </button>
    `).join("")}
  `;

  document.querySelectorAll("[data-ai-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAiScenarioId = button.dataset.aiScenario;
      renderAiPage();
    });
  });
}

function renderAiChat(scenario) {
  const container = document.querySelector("#ai-chat");
  if (!container) return;

  container.innerHTML = `
    <div class="chat-scroll" id="chat-scroll">
      ${aiMessages.map((message) => `
        <div class="chat-message ${message.role === "user" ? "user" : "ai"}">
          <span>${message.role === "user" ? "You" : "AI"}</span>
          <p>${message.text}</p>
        </div>
      `).join("")}
    </div>
    <div class="chat-input">
      <input id="ai-input" type="text" placeholder="输入英文回答，比如：I'd like a medium iced latte, please.">
      <button type="button" data-ai-voice>语音</button>
      <button class="primary-send" type="button" data-ai-send>发送</button>
    </div>
  `;

  const input = document.querySelector("#ai-input");
  const send = document.querySelector("[data-ai-send]");
  const voice = document.querySelector("[data-ai-voice]");
  const submit = () => sendAiMessage(scenario, input.value);

  send.addEventListener("click", submit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit();
  });
  voice.addEventListener("click", () => {
    input.value = "I'd like a medium iced latte, please.";
    input.focus();
  });

  const scroll = document.querySelector("#chat-scroll");
  scroll.scrollTop = scroll.scrollHeight;
}

async function requestAiCoach(scenario, userText) {
  const localResult = scoreAiReply(userText, scenario);
  const userMessages = aiMessages
    .filter((message) => message.role === "user")
    .map((message) => ({ role: "user", content: message.text }));

  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: scenario.id,
        scenarioTitle: scenario.title,
        goal: scenario.goal,
        messages: [...userMessages, { role: "user", content: userText }]
      })
    });

    if (!response.ok) throw new Error("AI service unavailable");
    const data = await response.json();
    if (data.fallback) throw new Error(data.error || "AI service fallback");

    return {
      reply: data.reply || getNextAiPrompt(scenario, userMessages.length + 1),
      score: Number(data.score) || localResult.score,
      feedback: data.feedback || localResult.feedback,
      suggestion: data.suggestion || scenario.suggestion,
      keywordHits: localResult.keywordHits,
      source: "api"
    };
  } catch {
    return {
      ...localResult,
      reply: getNextAiPrompt(scenario, userMessages.length + 1),
      suggestion: scenario.suggestion,
      source: "local"
    };
  }
}

async function sendAiMessage(scenario, text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const userMessageCount = aiMessages.filter((message) => message.role === "user").length + 1;
  const result = await requestAiCoach(scenario, trimmed);
  aiMessages = [
    ...aiMessages,
    { role: "user", text: trimmed },
    { role: "ai", text: result.reply || getNextAiPrompt(scenario, userMessageCount) }
  ];
  recordAiPractice(scenario, result.score);
  saveScenarioMessages(scenario.id, aiMessages);
  renderAiChat(scenario);
  renderAiFeedback(scenario, trimmed, result);
}

function renderAiFeedback(scenario, latestText = "", scoredResult = null) {
  const container = document.querySelector("#ai-feedback");
  if (!container) return;

  const lastUserMessage = latestText || [...aiMessages].reverse().find((message) => message.role === "user")?.text || "";
  const result = scoredResult || (lastUserMessage
    ? scoreAiReply(lastUserMessage, scenario)
    : { score: "--", feedback: "先输入一句英文回答，系统会根据完整度、场景关键词和礼貌表达给出模拟反馈。", keywordHits: 0 }
  );
  const today = getTodayProgress();
  const modeText = result.source === "api"
    ? "当前使用真实 AI"
    : "当前使用本地模拟；部署后配置 MiniMax API Key 可启用真实 AI";

  container.innerHTML = `
    <p class="eyebrow">Session Goal</p>
    <h2>${scenario.goal}</h2>
    <p>${scenario.guidance}</p>
    <div class="score-box"><strong>${result.score}</strong><span>表达完整度</span></div>
    <p class="feedback-text">${result.feedback}</p>
    <p class="progress-note">场景关键词命中：${result.keywordHits} · 当前对话 ${aiMessages.filter((message) => message.role === "user").length} 轮 · 今日 AI 陪练 ${today.aiPracticeCount} 轮</p>
    <p class="ai-mode-note">${modeText}</p>
  `;
}

function getExpressionItems(videoId, tab) {
  const library = expressionLibrary[videoId] || expressionLibrary["meeting-follow-up"];
  return library[tab] || [];
}

function getExpressionStatuses(items) {
  const statuses = [
    { value: "all", label: `全部 (${items.length})` },
    { value: "unmarked", label: `未标记 (${items.filter((item) => (item.status || "unmarked") === "unmarked").length})` },
    { value: "known", label: `认识 (${items.filter((item) => item.status === "known").length})` },
    { value: "unknown", label: `不认识 (${items.filter((item) => item.status === "unknown").length})` }
  ];
  return statuses;
}

function renderTipsPage() {
  renderTipsVideoList();
  renderTipsHeader();
  renderExpressionTabs();
  renderExpressionFilters();
  renderExpressionGrid();
  bindTipsSearch();
}

function renderTipsVideoList(searchText = "") {
  const container = document.querySelector("#tips-video-list");
  if (!container) return;

  const normalized = searchText.trim().toLowerCase();
  const visibleVideos = videos.filter((video) => video.title.toLowerCase().includes(normalized));
  container.innerHTML = visibleVideos.map((video) => `
    <button class="tips-video-item ${video.id === activeTipsVideoId ? "active" : ""}" type="button" data-tips-video="${video.id}">
      <span>${video.title}</span>
      <small>${video.topicLabel} · ${video.durationMinutes}分钟</small>
    </button>
  `).join("");

  document.querySelectorAll("[data-tips-video]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTipsVideoId = button.dataset.tipsVideo;
      activeExpressionFilter = "all";
      renderTipsPage();
    });
  });
}

function renderTipsHeader() {
  const title = document.querySelector("#tips-video-title");
  const summary = document.querySelector("#tips-video-summary");
  const link = document.querySelector("#tips-learn-link");
  if (!title || !summary || !link) return;

  const video = getVideoById(activeTipsVideoId);
  const library = expressionLibrary[activeTipsVideoId] || expressionLibrary["meeting-follow-up"];
  title.textContent = video.title;
  summary.textContent = library.summary;
  link.href = `learn.html?video=${video.id}`;
}

function renderExpressionTabs() {
  document.querySelectorAll("[data-expression-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.expressionTab === activeExpressionTab);
    button.addEventListener("click", () => {
      activeExpressionTab = button.dataset.expressionTab;
      activeExpressionFilter = "all";
      renderExpressionTabs();
      renderExpressionFilters();
      renderExpressionGrid();
    });
  });
}

function renderExpressionFilters() {
  const container = document.querySelector("#expression-filters");
  if (!container) return;

  const items = getExpressionItems(activeTipsVideoId, activeExpressionTab);
  container.innerHTML = getExpressionStatuses(items).map((status) => `
    <button class="${status.value === activeExpressionFilter ? "active" : ""}" type="button" data-expression-filter="${status.value}">
      ${status.label}
    </button>
  `).join("");

  document.querySelectorAll("[data-expression-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeExpressionFilter = button.dataset.expressionFilter;
      renderExpressionFilters();
      renderExpressionGrid();
    });
  });

  const toggle = document.querySelector("#toggle-chinese");
  if (toggle) {
    toggle.textContent = tipsChineseVisible ? "隐藏中文" : "显示中文";
    toggle.onclick = () => {
      tipsChineseVisible = !tipsChineseVisible;
      renderExpressionFilters();
      renderExpressionGrid();
    };
  }
}

function renderExpressionGrid() {
  const grid = document.querySelector("#expression-grid");
  if (!grid) return;

  const items = getExpressionItems(activeTipsVideoId, activeExpressionTab)
    .filter((item) => activeExpressionFilter === "all" || (item.status || "unmarked") === activeExpressionFilter);

  grid.innerHTML = items.length
    ? items.map((item) => `
      <article class="expression-card">
        <div class="expression-card-head">
          <h2>${item.term}</h2>
          <button type="button" aria-label="播放 ${item.term}">▶</button>
        </div>
        ${item.phonetic ? `<p class="phonetic">${item.phonetic}</p>` : ""}
        <strong>${tipsChineseVisible ? item.cn : "中文已隐藏"}</strong>
        <p>${item.en}</p>
        <blockquote>
          <span>${item.example}</span>
          ${tipsChineseVisible ? `<small>${item.exampleCn}</small>` : ""}
        </blockquote>
        <div class="expression-actions"><span>复习</span><span>收藏</span></div>
      </article>
    `).join("")
    : `<article class="expression-card empty-state"><h2>这里暂时没有内容</h2><p>换一个标签或筛选条件继续查看。</p></article>`;
}

function bindTipsSearch() {
  const input = document.querySelector("#tips-search");
  if (!input) return;
  input.oninput = () => renderTipsVideoList(input.value);
}

function renderCurrentPage() {
  const page = document.body.dataset.page;
  if (page === "library") renderLibrary();
  if (page === "favorites") renderFavorites();
  if (page === "learn") renderLearnPage();
  if (page === "profile") renderProfile();
  if (page === "ai") renderAiPage();
  if (page === "tips") renderTipsPage();
}

renderCurrentPage();
