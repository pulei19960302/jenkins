export const getUserTypesEnum = async ()=>{
    const { data } = await $api.user.userLevelList({},{cache:true})
    const userTypesEnum = data.items.reduce((a,b)=>{
        a[b.id] = b.name
        return a
    },{})
    return Promise.resolve(userTypesEnum)
}