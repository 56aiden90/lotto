
interface Question{
    id : number;
    title : string;
    options : Option[];
    selected? : string | number;
}

interface Option{
    label : string;
    value : string | number;
}

export default Question;
