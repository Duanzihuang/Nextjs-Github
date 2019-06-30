const LRU = require("lru-cache")

const REPO_CACHE = new LRU({
    maxAge: 1000 * 60 * 60
})

export function cache(cache){
    REPO_CACHE.set(cache.full_name,cache)
}

export function get(full_name){
    return REPO_CACHE.get(full_name)
}

export function cacheArray(repos){
    if (repos && Array.isArray(repos)){
        repos.forEach(repo => cache(repo))
    }
}