import { useEffect , useState } from "react";


const DailyQuote = () => {
    const [dailyQuote, setDailyQuote] = useState({ text: '', author: '' });
    
    useEffect(() => {
       
        const quotes = [
            {
                text: "The beautiful thing about learning is that nobody can take it away from you.",
                author: "B.B. King"
            },
            {
                text: "Education is the most powerful weapon which you can use to change the world.",
                author: "Nelson Mandela"
            },
            {
                text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
                author: "Dr. Seuss"
            },
            {
                text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                author: "Winston Churchill"
            },
            {
                text: "The expert in anything was once a beginner.",
                author: "Helen Hayes"
            },
            {
                text: "Don't watch the clock; do what it does. Keep going.",
                author: "Sam Levenson"
            },
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt"
            },
            {
                text: "It does not matter how slowly you go as long as you do not stop.",
                author: "Confucius"
            },
            {
                text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
                author: "Thomas Edison"
            },
            {
                text: "You are never too old to set another goal or to dream a new dream.",
                author: "C.S. Lewis"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "Education is not preparation for life; education is life itself.",
                author: "John Dewey"
            },
            {
                text: "The mind is not a vessel to be filled, but a fire to be kindled.",
                author: "Plutarch"
            },
            {
                text: "Learning is a treasure that will follow its owner everywhere.",
                author: "Chinese Proverb"
            },
            {
                text: "The only person you are destined to become is the person you decide to be.",
                author: "Ralph Waldo Emerson"
            },
            {
                text: "It always seems impossible until it's done.",
                author: "Nelson Mandela"
            },
            {
                text: "Don't let what you cannot do interfere with what you can do.",
                author: "John Wooden"
            },
            {
                text: "You don't have to be great to start, but you have to start to be great.",
                author: "Zig Ziglar"
            },
            {
                text: "A person who never made a mistake never tried anything new.",
                author: "Albert Einstein"
            },
            {
                text: "The secret of getting ahead is getting started.",
                author: "Mark Twain"
            },
            {
                text: "The best way to predict your future is to create it.",
                author: "Abraham Lincoln"
            },
            {
                text: "Strive for progress, not perfection.",
                author: "Unknown"
            },
            {
                text: "The journey of a thousand miles begins with one step.",
                author: "Lao Tzu"
            },
            {
                text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
                author: "Malcolm X"
            },
            {
                text: "The difference between ordinary and extraordinary is that little extra.",
                author: "Jimmy Johnson"
            },
            {
                text: "You miss 100% of the shots you don't take.",
                author: "Wayne Gretzky"
            },
            {
                text: "The only impossible journey is the one you never begin.",
                author: "Tony Robbins"
            },
            {
                text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
                author: "Roy T. Bennett"
            },
            {
                text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
                author: "Ralph Waldo Emerson"
            },
            {
                text: "The more I learn, the more I realize how much I don't know.",
                author: "Albert Einstein"
            },
            {
                text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
                author: "Brian Herbert"
            },
            {
                text: "Education is the key to unlocking the world, a passport to freedom.",
                author: "Oprah Winfrey"
            },
            {
                text: "The beautiful thing about learning is that no one can take it away from you.",
                author: "B.B. King"
            },
            {
                text: "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.",
                author: "Martin Luther King Jr."
            },
            {
                text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
                author: "Dr. Seuss"
            },
            {
                text: "Education is not the filling of a pail, but the lighting of a fire.",
                author: "William Butler Yeats"
            },
            {
                text: "The best way to learn is by doing; the worst way to teach is by talking.",
                author: "Unknown"
            },
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "The expert in anything was once a beginner.",
                author: "Helen Hayes"
            },
            {
                text: "The future of the world is in my classroom today.",
                author: "Ivan Welton Fitzwater"
            },
            {
                text: "Education is the most powerful tool we can use to change the world.",
                author: "Nelson Mandela"
            },
            {
                text: "The mind is not a vessel to be filled, but a fire to be kindled.",
                author: "Plutarch"
            },
            {
                text: "The great aim of education is not knowledge but action.",
                author: "Herbert Spencer"
            },
            {
                text: "The only person who is educated is the one who has learned how to learn and change.",
                author: "Carl Rogers"
            },
            {
                text: "The more I live, the more I learn. The more I learn, the more I realize, the less I know.",
                author: "Michel Legrand"
            },
            {
                text: "The purpose of education is to replace an empty mind with an open one.",
                author: "Malcolm Forbes"
            },
            {
                text: "The best students are not those who memorize everything, but those who understand and apply.",
                author: "Unknown"
            },
            {
                text: "The only way to learn mathematics is to do mathematics.",
                author: "Paul Halmos"
            },
            {
                text: "The more you read, the more things you will know. The more that you learn, the more places you'll go.",
                author: "Dr. Seuss"
            },
            {
                text: "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.",
                author: "Martin Luther King Jr."
            },
            {
                text: "The beautiful thing about learning is that no one can take it away from you.",
                author: "B.B. King"
            },
            {
                text: "The more I learn, the more I realize how much I don't know.",
                author: "Albert Einstein"
            },
            {
                text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
                author: "Brian Herbert"
            },
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "The expert in anything was once a beginner.",
                author: "Helen Hayes"
            },
            {
                text: "The future of the world is in my classroom today.",
                author: "Ivan Welton Fitzwater"
            },
            {
                text: "Education is the most powerful tool we can use to change the world.",
                author: "Nelson Mandela"
            },
            {
                text: "The mind is not a vessel to be filled, but a fire to be kindled.",
                author: "Plutarch"
            },
            {
                text: "The great aim of education is not knowledge but action.",
                author: "Herbert Spencer"
            },
            {
                text: "The only person who is educated is the one who has learned how to learn and change.",
                author: "Carl Rogers"
            },
            {
                text: "The more I live, the more I learn. The more I learn, the more I realize, the less I know.",
                author: "Michel Legrand"
            },
            {
                text: "The purpose of education is to replace an empty mind with an open one.",
                author: "Malcolm Forbes"
            },
            {
                text: "The best students are not those who memorize everything, but those who understand and apply.",
                author: "Unknown"
            },
            {
                text: "The only way to learn mathematics is to do mathematics.",
                author: "Paul Halmos"
            }
        ];
        
       
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setDailyQuote(randomQuote);
        
        
        const intervalId = setInterval(() => {
            const newRandomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setDailyQuote(newRandomQuote);
        }, 24 * 60 * 60 * 1000);
        
        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">Daily Inspiration</span>
            </h2>
            <blockquote className="italic text-gray-700 mb-2">"{dailyQuote.text}"</blockquote>
            <p className="text-right text-gray-600">- {dailyQuote.author}</p>
        </div>
    );
};
export default DailyQuote;