app.get('/autocomplete', (req, res) => {
    const query = req.query.query.toLowerCase();
    const sql = `SELECT * FROM services WHERE name LIKE '${query}%'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error performing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const autocompleteResults = results.map(result => result.name);
        res.json(autocompleteResults);
    });
});