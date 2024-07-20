//抽奖人员名单
var allPerson = "欧阳安俏;黄春然;Sh;孔富江;舒金培;王嘉伟;158****8965;陈锡鑫;林子闻;林海吟;郭佑铭;韩玉玉;赖俊希;张福财;莫馥全;范智威;黄卓雄;吴明翰;蔡翔宇;刘远鹏;何小姐;钟世杰;简智华;黄先生;黄俊鑫;186****6311;张冠强;高伟峰;杨美志;陈逸楷;晓明;黄炎森;庞文豪;樊顺;林;林晓涛;宋春松;饶泰山;曾国涛;陈鸣;冯锵健;孟涛;钱建锋;孟浩;刘媛媛;石雨珉;尹沃康;李杰荣;吴东发;李宜蓁;余勇圻;吴森鑫;周东平;王怡博;张凯迪;张尚文;梁景怡;潘星培;Henry;赖锐;邓;段正午;赵小吉;许家欣;欧阳泽佳;吴依玲;王汀;曾淦;梁焕辉;梁峰;杨梦洁;关宇;黄海燕;赖正火;陈生;戴泽升;范志豪;周灿荣;张志坚;Xeaon;陈粤龙;Jack;林祺沁;黄锐;李志鹏;吴嘉骅;刘岩;潘宏远;张林;赖柏宇;李德正;陈先生;毛韶阳;Dev;宋斌;邓豪;冯;袁先生;黄伟峻;梁伟涛;翟宇;麦月克;陈同学;邓报华;李威;李云熙;张亮坤;刘恒利;黎梓健;黄越;潘鲁彤;莫;李子毅;庄红艳;秦妮娜;何钊懿;张巧滢;刘平涛;黄沛铧;葉孟良;郑小姐;吴志洪;叶炜文;文明瑶;周靖杰;刘澳秋;刘钰城;陈颜;叶在展;陈宇豪;吴远至;吴巧悦;苏辰志;安静;段浪涛;杨雯淇;刘小彤;林依航;郑权烽;张甫;张先生;刘培炎;赖乐淇;谢安琪;刘馨;叶健毅;肖先生;曾晓帆";
//领导人员名单
var leaderArr = [];
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数");
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><b>" + person + "</b></span>";
        }
        else {
            tempHtml += "<span>" + person + "</span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
