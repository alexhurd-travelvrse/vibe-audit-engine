
import('./api/audit.js').then(async (m) => {
    try {
        const req = { method: 'GET', query: { city: 'London', neighborhood: 'Richmond' } };
        let outputData;
        const res = {
            setHeader: () => {},
            status: (s) => ({ json: (data) => { outputData = data; } })
        };
        await m.default(req, res);
        
        const hotelCategory = outputData.Categories['Hotel'];
        if (hotelCategory && hotelCategory.TopLocalVenue) {
            console.log(JSON.stringify(hotelCategory.TopLocalVenue, null, 2));
            console.log('\nTop Vibes for this Hotel Category:');
            hotelCategory.Top3Vibes.forEach(v => console.log('- ' + v.vibeName));
        } else {
            console.log('No hotel venue found.');
        }
    } catch (e) {
        console.error(e);
    }
});

