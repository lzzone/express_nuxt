var express = require("express");
var router = express.Router();

router.get("/get", function(req, res) {
    req.sql.query(
        "SELECT id,title,content FROM bbs ORDER BY id DESC",
        [],
        function(err, result, fields) {
            if (err) {
                throw err;
            } else if (result.length >= 1) {
                res.back(1, result, "获取成功");
            } else {
                res.back(-1, result, "没有数据");
            }
        }
    );
});
router.get("/get/:id", function(req, res) {
    req.sql.query("SELECT * FROM bbs where id=?", [req.params.id], function(
        err,
        result,
        fields
    ) {
        if (result.length >= 1) {
            res.back(1, result, "获取成功");
        } else {
            res.back(-1, result, "没有数据");
        }
    });
});

module.exports = router;
