import { environment } from '../../../environments/environment';
export class AppSettings {
    public static SERVICE_BASE_URL: String = environment.production ? 'https://ravindra-back.herokuapp.com' : 'http://localhost:3000';
    //
}

