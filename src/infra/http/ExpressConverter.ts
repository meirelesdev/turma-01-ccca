export default class ExpressConvert {
  static execute(fn: any) {
    return async function (req: any, res: any, next: any) {
      try {
        const result = await fn(req.params, req.body, req.headers);
        res.json(result);
      } catch (error: any) {
        console.log(error);
        res.status(422);
        res.json({ message: error.message });
      }
    };
  }
  static filter(fn: any) {
    return async function (req: any, res: any, next: any) {
      try {
        await fn(req.params, req.body, req.headers);
        next();
      } catch (error: any) {
        res.status(422);
        res.json({ message: error.message });
      }
    };
  }
}
