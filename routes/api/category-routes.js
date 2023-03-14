const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', (req, res) => {
  
  Category.findAll({
    
    include: [
      {
        model: Product
      }
    ]
  })
  .then(categoryItems => res.json(categoryItems))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]     
  })
  .then(categoryItems => {
    if (!categoryItems) {
        res.status(404).json({ message: 'This Category appears not to be linked to any id!' });
      return;
  }
    res.json(categoryItems)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
 
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryItems => res.json(categoryItems))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  
  Category.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )
  .then(categoryItems => {
    if (!categoryItems) {
        res.status(404).json({ message: 'This Category appears not to be linked to any id!' });
        return;
    }
    res.json(categoryItems);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryItems => {
    if (!categoryItems) {
        res.status(404).json({ message: 'This Category appears not to be linked to any id!' });
        return;
    }
    res.json(categoryItems);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;