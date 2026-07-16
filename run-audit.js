
import('./api/audit.js').then(async (m) => {
    try {
        const req = { method: 'GET', query: { city: 'Corfu', neighborhood: 'Kassiopi' } };
        let outputData;
        const res = {
            setHeader: () => {},
            status: (s) => ({ json: (data) => { outputData = data; } })
        };
        await m.default(req, res);
        
        const rankings = outputData.MacroCategoryRankings || [];
        const categories = outputData.Categories || {};
        
        const top5 = rankings.filter(r => r.categoryName !== 'Hotel').slice(0, 5);
        
        let result = '';
        for (const cat of top5) {
            result += '\n### ' + cat.categoryName + ' (' + cat.dominanceScore + '/100)\n*' + cat.justification + '*\n';
            const vibes = categories[cat.categoryName]?.Top3Vibes || [];
            vibes.forEach(v => {
                result += '- **' + v.vibeName + '** (Growth: ' + v.growthTrend + ')\n';
                if (v.semanticKeywords) result += '  Keywords: ' + v.semanticKeywords.join(', ') + '\n';
            });
        }
        
        console.log(result);
    } catch (e) {
        console.error(e);
    }
});

