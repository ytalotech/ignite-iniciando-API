
interface Course{
    name: string;
    duration: number;
    educator: string;
}

class CreateCourseService{
    execute({name, duration, educator}: Course){
        console.log(name, duration, educator);
    }
}

// new não precisa instaciar
export default new CreateCourseService;