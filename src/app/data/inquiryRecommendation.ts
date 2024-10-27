interface Recommendations {
    id: number;
    originalLanguage: string;
    translatedLanguage: string | null;
    text: string;
    translatedText: string | null;
}

export const recommendations: Recommendations[] = [
    {
        id: 1,
        originalLanguage: "en",
        translatedLanguage: "",
        text: "The staff was incredibly attentive and helpful throughout our stay.",
        translatedText: ""
    },
    {
        id: 2,
        originalLanguage: "en",
        translatedLanguage: "zh",
        text: "The hotel location is perfect for accessing nearby attractions.",
        translatedText: "酒店的位置非常适合前往附近的景点。"
    },
    {
        id: 3,
        originalLanguage: "en",
        translatedLanguage: "zh",
        text: "The concierge was knowledgeable and gave great recommendations for local restaurants.",
        translatedText: "礼宾服务知识丰富，并提供了很好的当地餐厅推荐。"
    }
];


