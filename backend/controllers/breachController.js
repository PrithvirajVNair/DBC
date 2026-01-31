const { 
    XposedOrNot,
    XposedOrNotError,
    RateLimitError,
    ValidationError,
    NetworkError,
    TimeoutError, 
} = require('xposedornot');
const xon = new XposedOrNot();

exports.getDataBreachController = async (req, res) => {
    const email = req.query.email
    console.log(email);

    try {
        const result = await xon.getBreachAnalytics(email);
        res.status(200).json(result)
    }
    catch (error) {
        if (error instanceof ValidationError) {
            console.error('Invalid input:', error.message);
            res.status(500).json('Invalid input:', error.message)
        } else if (error instanceof RateLimitError) {
            console.error('Rate limited. Retry after:', error.retryAfter);
            res.status(500).json('Rate limited. Retry after:', error.retryAfter)
        } else if (error instanceof NetworkError) {
            console.error('Network error:', error.message);
            res.status(500).json('Network error:', error.message)
        } else if (error instanceof TimeoutError) {
            console.error('Request timed out');
            res.status(500).json('Request timed out')
        } else if (error instanceof XposedOrNotError) {
            console.error('API error:', error.message, error.code);
            res.status(500).json('API error:', error.message, error.code)
        }
    }
}