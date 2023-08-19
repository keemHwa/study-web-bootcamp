const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    res.send('모든 보호소');
})
router.post('/', (req, res) => {
    res.send('보호소 등록');
})
router.get('/:id', (req, res) => {
    res.send('조회');
})
router.get('/:id/edit', (req, res) => {
    res.send('보호소 편집');
})


module.exports = router;