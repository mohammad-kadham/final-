export const api_request = async function(url){
   try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`bad fucking request${res.message}`);
    return data
   } catch (error) {
    throw error
   }
}