/**
 * ShibeService interface
 * Fetches a random shiba inu pictures on the internet.
 * @author Matteo AUGER
 */
export default interface IShibeService {
    /**
     * Fetches a random shiba inu pictures on the internet.
     * @returns {Promise<string>} Random image request promise.
     */
    fetchRandomShibe(): Promise<string>;
}
