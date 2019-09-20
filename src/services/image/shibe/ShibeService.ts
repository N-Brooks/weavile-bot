import http from "http";
import { injectable } from "inversify";
import IShibeService from "./IShibeService";

/**
 * ShibeService implementation
 * Fetches a random shiba inu pictures on the internet.
 * Uses the http://shibe.online/ API.
 * @author Matteo AUGER
 */
@injectable()
export default class ShibeService implements IShibeService {
    /**
     * Random shibe picture url.
     * Returns a JSON document containing the image at index 0.
     */
    private readonly url = "http://shibe.online/api/shibes";

    /**
     * Fetches a random shiba inu pictures on the internet.
     * @returns {Promise<string>} Random image request promise.
     */
    public fetchRandomShibe(): Promise<string> {
        return new Promise((resolve, reject) => {
            const request = http.get(this.url, (response) => {
                // handling response errors
                if ((response.statusCode && (response.statusCode < 200 || response.statusCode > 299))) {
                    reject(new Error("Failed to load page, status code: " + response.statusCode));
                }

                // collecting the response content
                const content: any = [];
                response.on("data", (chunk) => content.push(chunk)); // pushing each received chunk in the data array
                response.on("end", () => {
                    const parsedData = JSON.parse(content);
                    if (Object.keys(parsedData).length < 1) {
                        reject("There was a problem retrieving the shibe picture.");
                    }

                    resolve(parsedData[0]);
                });
            });

            // handling request error
            request.on("error", (error) => Promise.reject(error.message));
        });
    }
}
