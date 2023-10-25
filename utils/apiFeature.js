
class ApiFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    /*User search recipe by alpha (keyword)*/

    /* Users can filter recipes based on categories, cuisine, and dietary restrictions. */
    filter() {
        const params = {...this.queryString}
        const extraPrams = ["limit", "page"]
        extraPrams.forEach(el => delete params[el])
        const caseSensitive = {};
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                caseSensitive[key] = new RegExp(params[key], 'i');
            }
        }
        this.query = this.query.find(caseSensitive);
        return this;
    }

    /* Paginate the Recipe results */
    paginate() {
        const page = this.queryString.page;
        const limit = this.queryString.limit;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeature