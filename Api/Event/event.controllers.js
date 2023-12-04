const Event = require("../../models/Event");

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate({
        path: "event_category",
        select: "category_Name",
      })
      .populate("organization");
    return res.status(201).json(events);
  } catch (err) {
    next(err);
  }
};

///// USE THIS ONE
exports.CreateEvent = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.event_image = req.file.path.replace("\\", "/");
    }
    const newEventData = {
      ...req.body,
      organization: req.organization._id,
    };
    const newEvent = await Event.create(newEventData);
    await EventCategory.findByIdAndUpdate(req.body.event_category, {
      $push: { events: newEvent._id },
    });

    await chef.findByIdAndUpdate(req.user._id, {
      $push: { recipes: newRecipe._id },
    });

    newRecipe.ingredients.forEach(async (ingredientId) => {
      await ingredient.findByIdAndUpdate(ingredientId, {
        $push: { recipes: newRecipe._id },
      });
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.recipesDelete = async (req, res, next) => {
  try {
    await req.Recipe.deleteOne();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.recipesUpdate = async (req, res, next) => {
  try {
    await req.recipe.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      return recipe;
    } else {
      next({ message: "Recipe not found", status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

exports.getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).populate({
      path: "user",
      select: "username",
    });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};
//addrecipetoingredients
////// DO NOT USE
exports.addingredientToRecipe = async (req, res, next) => {
  try {
    const foundIngredient = await ingredient.findById(req.body.ingredientId);
    console.log(foundIngredient);
    const newrec = await req.Recipe.updateOne({
      $push: { ingredients: foundIngredient._id },
    });
    // console.log(newrec);
    await foundIngredient.updateOne({ $push: { recipes: req.recipes } });

    return res.status(204).json(newrec);
  } catch (error) {
    next(error);
  }
};
