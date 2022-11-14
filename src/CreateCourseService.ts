
interface Course{
    name: string;
    duration?: number;
    educator: string;
}

class CreateCourseService{
    execute({name, duration = 8, educator}: Course){
        console.log(name, duration, educator);
    }
}

// new não precisa instaciar
export default new CreateCourseService;