import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

// Update the Quote interface to match DummyJSON API
interface Quote {
    id: number;
    quote: string;
    author: string;
}

function App() {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Async function to fetch a new quote from backend server.js
    const fetchNewQuote = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch from backend endpoint /api/quote
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api/quote';
            const response = await fetch(backendUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setQuote(data);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(String(e));
            }
            setQuote(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch a quote on component mount
    useEffect(() => {
        fetchNewQuote();
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-y-hidden">
            <Card className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-2xl rounded-2xl border-0 w-[600px]">
                <CardContent>
                    {error && (
                        <p className="text-xl italic mb-4 text-red-400">
                            Error: {error}. Please try again!
                        </p>
                    )}
                    {!error && quote && (
                        <>
                            <p className="text-xl italic mb-4 text-slate-100 normal-case">
                                &quot;{quote.quote}&quot;
                            </p>
                            <p className="text-lg font-semibold text-slate-300 normal-case">
                                - {quote.author}
                            </p>
                        </>
                    )}
                    <div className="flex justify-center w-full mt-6">
                        <Button
                            className="
                                px-6 py-2
                                bg-gradient-to-r from-blue-500 to-purple-500
                                text-white font-bold
                                rounded-full shadow-lg
                                hover:from-purple-500 hover:to-blue-500
                                transition-all duration-200
                                focus:ring-2 focus:ring-blue-300
                                active:scale-95
                                hover:cursor-pointer
                            "
                            onClick={fetchNewQuote}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                                    Loading...
                                </>
                            ) : (
                                'Get New Quote'
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
