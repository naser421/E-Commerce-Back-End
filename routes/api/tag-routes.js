const router = require('express').Router();

const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(ItemData => res.json(ItemData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
 
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'productTag_product'
      }
    ]
  })
  .then(ItemData => {
    if (!ItemData) {
        res.status(404).json({ message: 'This Tag appears not to be linked to any id!' });
      return;
    }
    res.json(ItemData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
 
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(ItemData => res.json(ItemData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(ItemData => {
    if (!ItemData) {
        res.status(404).json({ message: 'This Tag appears not to be linked to any id!' });
        return;
    }
    res.json(ItemData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(ItemData => {
    if (!ItemData) {
        res.status(404).json({ message: 'This Tag appears not to be linked to any id!' });
        return;
    }
    res.json(ItemData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;