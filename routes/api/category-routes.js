const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    res.status(200).json(await Category.findAll({ include : [{model: Product}]}));
    } catch (err){res.status(500).json(err)}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  if (!req.params.id) {
    res.status(404).json({message: "Ope! check the id!"});
    return;
  }
  try{
    res.status(200).json(await Category.findByPk(req.params.id, { include : [{model: Product}]}));
    } catch (err){res.status(500).json(err)}
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    res.status(200).json(await Category.create(req.body));
    } catch (err){res.status(400).json(err)}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    res.status(200).json(await Category.update(req.body, {where: {id: req.params.id}}));
  } catch (err){res.status(500).json(err)}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    res.status(200).json(await Category.destroy( {where: {id: req.params.id}}));
  } catch (err){res.status(500).json(err)}
});

module.exports = router;
