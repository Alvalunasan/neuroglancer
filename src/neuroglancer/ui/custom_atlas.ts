/**
 * This is a hard-coded mapping of the ARA3 annotations to human readable name.
 *
 * This data is derived from http://api.brain-map.org/api/v2/structure_graph_download/1.json .
 *
 * TODO: We should write a parser for JSON ontologies.
 *
 */


export class CustomAtlas {
    constructor() {
        console.log('custom atlas created!');
    }

    public getNameForId(id: number) {
        return this.ara_id.has(id) ? this.ara_id.get(id) : 'UNKNOWN';
    }

    ara_id: Map<number, string> = new Map([
    	[0,'0: a test']
    	]);

}