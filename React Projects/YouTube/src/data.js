export const API_KEY = 'AIzaSyDqQhAaD-hoPiK5GUOt8DjvD7bP4cDBXcA'; 

export const val_convertor = (val)=>{
    if(val >= 1000000){
        return Math.floor(val/1000000) + "M";
    }
    else if(val >= 1000){
        return Math.floor(val/1000) + "K";
    }
    else{
        return val;
    }
}