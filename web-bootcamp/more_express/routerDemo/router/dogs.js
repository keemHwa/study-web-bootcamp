const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    res.send('모든 강아지');
})

router.post('/', (req, res) => {
    res.send('강아지 등록');
})
router.get('/:id', (req, res) => {
    res.send('조회');
})
router.get('/:id/edit', (req, res) => {
    res.send('강아지 정보 편집');
})


module.exports = router;