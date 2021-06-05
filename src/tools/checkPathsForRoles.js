export function checkPathsForRoles(path,role) {
    let arr = [];
    for (let i = 0; i<path.length;i++){
        if (path[i].access.indexOf(role) !== -1){
            arr.push(path[i])
            console.log(path[i])
        }
    }
    return arr;
}