const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
const tagData = await Tag.findAll().catch((err)=>{
  res.json(err);
});
const tags = tagData.map((dish)=> dish.get({plain: true}));
res.render('all',{tags: tags});
  // find all tags
  // be sure to include its associated Product data
});

router.get('/tag/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id);
    if(!tagData){
      res.status(404).json({message: 'No tag with this id!'});
      return;
    }
    const tag = tagData.get({plain: true});
    res,render('tag', tag);
  }catch (err){
    res.status(500).json(err);
  };
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const locationData = await Tag.create({
      tag_id: req.body.tag_id,
    });
  res.status(200).json(locationData);
  }catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where : {
        id: req.params.id,
      },
    });
    if(!tagData){
      res.status(404).json ({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch(err){
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
