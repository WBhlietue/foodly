const loadedData = []; // iishee load hiisen datag hadgalna

var user = null; // login hiisen baigaa user

//num - hoolnii dugaar (primary key)

export function GetWithNum(num){
    // herev load dotor baigaa bol shuud teriigee return
    // tegehgu bol database iin hereglee ihesne
    // baihgu bol database ees tatna
    return 0;
}

export function GetRandonFood(){ // avahdaa filter ajilna
    return 0;
}

export function GetNumberRandomFood(num){ // neg doroo olon random avah
    for(let i = 0; i < num; i++){
        GetRandonFood();
    }
}

export function GetFoodsByCategory(num, category){ // category dotroos num shirheg avna

}

export function Login(){

}

export function Logout(){

}

export function Register(){

}

export function Comment(num, comment){ 

}

export function AddFavorite(num){

}

export function Upload(json){ 

}

export function Edit(json){

}

export function Delete(num){  //user ni uuriinhuu upload hiisniig ustgana

}

/*

    json format:
        hool = {
            num:1, -> primary key
            name:test,
            category:test,
            kkal:100,
            difficult:easy,
            time:3min,
            orts:nani, nani, nani,
            step:ehleed blabla, daraa ni blabla...,
        }
        comment = {
            num:1, -> hoolni cod
            comments:[
                {
                    userID:001,
                    comment:nani kore
                },
                {
                    userID:002,
                    comment:nani kore
                },
                                {
                    userID:003,
                    comment:nani kore
                }
            ]
        }

        user = {
            userID:001,
            userName:Dio Brando,
            userPic: https://www.....png,
            favorite:[foodNum1, foodNum2 ...],
            uploads:[foodNum1, foodNum2 ...],
            filter: [...] 
        }

*/