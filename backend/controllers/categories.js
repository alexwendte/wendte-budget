// Keep googlin wy I am getting this error

exports.getCategories = (req, res) => {
  // TODO get categories from db
  // const categories = await
  /**
   * TODO Need to only return the categories corresponding to the user
   * TODO I should do this by using the req.user's id as a db query
   */
  const categories = ['Groceries', 'Brianna a Babe']
  if (categories) {
    return res.json({ categories })
  }
  return res.status(404).send()
}
