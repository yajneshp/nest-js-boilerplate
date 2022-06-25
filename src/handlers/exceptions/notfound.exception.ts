import { Catch,  HttpStatus,  NotFoundException } from "@nestjs/common";

@Catch(NotFoundException)
class ResourceNotFoundException extends NotFoundException {
    constructor() {
        super( 
            { 
                'title': "Not Found",
                'message': "Resource Not Found"
            },
            "404"
        )
    }
}