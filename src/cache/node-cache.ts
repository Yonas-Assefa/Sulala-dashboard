import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 30 * 60, checkperiod: 120 });

export default cache;
