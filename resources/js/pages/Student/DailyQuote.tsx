import { useEffect , useState } from "react";


const DailyQuote = () => {
    const [dailyQuote, setDailyQuote] = useState({ text: '', author:''

});
useEffect(() => {
    const fetchQuote = async () => {
        try{
            const response = await fetch('/api/quotable/random?tags=inspirational');
            const data = await response.json();
            setDailyQuote({text:data.content,author:data.author});
        
        }catch(err){
            console.error('Error fetching quote:',err);
            setDailyQuote({text:"The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            });
        }
    };
    fetchQuote();

    const intervalId = setInterval(fetchQuote,24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
},[]);

    return (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">Daily Inspiration</span>
            </h2>
            <blockquote className="italic text-gray-700 mb-2" > "{ dailyQuote.text} "</blockquote>
            <p className="text-right text-gray-600"> -{dailyQuote.author}</p>
        </div>
    );
}
export default DailyQuote;