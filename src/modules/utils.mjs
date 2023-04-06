

//Fonction fléchée avec un seul argument et une seule instruction 
//(pas de parenthèses, pas d'accolades, pas de "return")
const slugify = str =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

export { slugify }