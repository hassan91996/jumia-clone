export const categories = (categoryList, linercategories = [], parent) => {
    if (categoryList) {
        for (let category of categoryList) {
            linercategories.push({
                _id: category._id,
                parent: parent,
                name: category.name,
                children:category.children
            })
            if (category.children.length > 0) categories(category.children,linercategories, category)
        }
    }
    return linercategories 
}
