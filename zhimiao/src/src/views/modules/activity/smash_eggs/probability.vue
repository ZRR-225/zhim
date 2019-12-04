<!-- 砸蛋概率表 -->
<template>
	<div class="probability">
		
		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getDataList1()">
			  <el-radio-button :label="1">幸运</el-radio-button>
		</el-radio-group>
<!-- 		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getDataList2()">
			  <el-radio-button :label="2">豪华</el-radio-button>
		</el-radio-group> -->
<!-- 		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getdd(),getDataList3()">
			  <el-radio-button :label="3">人品爆发</el-radio-button>
		</el-radio-group> -->
		<div>
		<template v-if="type === 1">
			<el-table :data="dataList1" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
					prop="prizeName"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftName"
					label="奖品"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftNum"
					label="数量"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="prizeDiamond"
					label="奖额"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="probability"
					label="单抽概率"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="tenProbability"
					label="十连抽概率"
					header-align="center"
					align="center">		
				</el-table-column>
				<el-table-column
					prop="hunderProbability"
					label="百连抽概率"
					header-align="center"
					align="center">
				</el-table-column>
			</el-table>
			<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
				<el-col style="margin-left:60px;">回报率</el-col>
				<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
					<el-col id="p1">{{this.returnGProbability}}%</el-col>
					<el-col id="p2">{{this.returnGtenProbability}}%</el-col>
					<el-col id="p3">{{this.returnGhunderProbability}}%</el-col>
				</div>
			</el-form>
			<el-form style="display: flex;justify-content: space-around;width: 525px;float: right;">
				<el-form-item>
					<!-- 单抽概率编辑 -->
					<el-button type="primary" @click="gsingleHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='黄金蛋单抽概率'
				  :visible.sync="gsingleVisible">
					<el-table :data="dataList1">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="probability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
<!-- 						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-col size="small"  placeholder="请输入内容">{{(((scope.row.prizeDiamond*scope.row.newProbability)/200)*100).toFixed(5)}}%</el-col>
								</template>
						</el-table-column> -->
					</el-table>
					<!-- 计算黄金蛋单抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnGProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnGProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col >{{this.newreturnGProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="gsingleVisible = false">取消</el-button>
					   <el-button type="primary" @click="gsingleVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
<!-- ///////////////////////////////////////////////////////////////////// -->
				<el-form-item>
					<!--十连抽概率编辑 -->
					<el-button type="success"  @click="gtenHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='黄金蛋十连抽概率'
				  :visible.sync="gtenVisible">
					<el-table :data="dataList1">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="tenProbability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算黄金蛋十连抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnGtenProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnGtenProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnGtenProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="gtenVisible = false">取消</el-button>
					   <el-button type="primary" @click="gtenVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
<!-- ///////////////////////////////////////////////////////////////////// -->
				<el-form-item>
					<!-- 百连抽概率编辑 -->
					<el-button type="warning"  @click="ghundredHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='黄金蛋百连抽概率'
				  :visible.sync="ghundredVisible">
					<el-table :data="dataList1">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="hunderProbability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算黄金蛋百连抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnGhunderProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnGhunderProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnGhunderProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="ghundredVisible = false">取消</el-button>
					   <el-button type="primary" @click="ghundredVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
			</el-form>

		</template>
		<!-- 钻石蛋 -->
		<template v-if="type === 2">
			<el-table :data="dataList2" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
					prop="prizeName"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftName"
					label="奖品"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftNum"
					label="数量"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="prizeDiamond"
					label="奖额"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="probability"
					label="单抽概率"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="tenProbability"
					label="十连抽概率"
					header-align="center"
					align="center">		
				</el-table-column>
				<el-table-column
					prop="hunderProbability"
					label="百连抽概率"
					header-align="center"
					align="center">
				</el-table-column>
			</el-table>
			<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
				<el-col style="margin-left:60px;">回报率</el-col>
				<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
					<el-col id="p4">{{this.returnDProbability}}%</el-col>
					<el-col id="p5">{{this.returnDtenProbability}}%</el-col>
					<el-col id="p6">{{this.returnDhunderProbability}}%</el-col>
				</div>
			</el-form>
			<el-form style="display: flex;justify-content: space-around;width: 525px;float: right;">
				<el-form-item>
					<!-- 单抽概率编辑 -->
					<el-button type="primary" @click="dsingleHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='钻石蛋单抽概率'
				  :visible.sync="dsingleVisible">
					<el-table :data="dataList2">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="probability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability"  placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算钻石蛋单抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnDProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnDProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnDProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="dsingleVisible = false">取消</el-button>
					   <el-button type="primary" @click="dsingleVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
<!-- ///////////////////////////////////////////////////////////////////// -->
				<el-form-item>
					<!--十连抽概率编辑 -->
					<el-button type="success"  @click="dtenHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='钻石蛋十连抽概率'
				  :visible.sync="dtenVisible">
					<el-table :data="dataList2">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="tenProbability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算钻石蛋十连抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnDtenProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnDtenProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnDtenProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="dtenVisible = false">取消</el-button>
					   <el-button type="primary" @click="dtenVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
<!-- ///////////////////////////////////////////////////////////////////// -->
				<el-form-item>
					<!-- 百连抽概率编辑 -->
					<el-button type="warning"  @click="dhundredHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='钻石蛋百连抽概率'
				  :visible.sync="dhundredVisible">
					<el-table :data="dataList2">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="hunderProbability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算钻石蛋百连抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnDhunderProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnDhunderProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnDhunderProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="dhundredVisible = false">取消</el-button>
					   <el-button type="primary" @click="dhundredVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
			</el-form>
		</template>
		<template v-if="type === 3">
			<el-table :data="dataList3" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
					prop="prizeName"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftName"
					label="奖品"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftNum"
					label="数量"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="prizeDiamond"
					label="奖额"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="probability"
					label="概率"
					header-align="center"
					align="center">
				</el-table-column>
			</el-table>
			<el-form style="display: flex;line-height:50px;border: 1px solid #ebeef5;justify-content: space-between;">
				<div style="display: flex;width: 425px;justify-content: space-around;align-items: center;">
					<div style="margin-left:60px;">人品爆发值</div>
					<div style="display: flex;line-height: 40px;float: right;justify-content: space-around;text-align: center;">
<!-- 						<div>{{this.strikeluckyValue}}</div> -->
						<div>{{this.strikeluckyValue}}</div>
					</div>
					<el-button type="primary" @click="strikeLuckyEdit()">编辑</el-button>
				</div>
<!-- 				<div>钻石百连抽回报率{{this.strikereturnDhunderProbability}}%</div> -->
				<div style="display: flex;width:510px;justify-content: space-around;align-items: center;">
					<div style="margin-left:30px;">回报率</div>
					<div style="display: flex;line-height: 40px;float: right;justify-content: space-around;text-align: center;">
						<div>{{this.strikereturnProbability}}%</div>
					</div>
				</div>
			</el-form>
			<!-- 人品爆发值编辑 -->
			<el-dialog				  
				title='人品爆发概率'
				:visible.sync="strikeLuckyedit"
				:close-on-click-model="false">
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原人品爆发值</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.strikeluckyValue}}</el-col>
						</div>
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.strikereturnProbability}}%</el-col>
						</div>
					</el-form>
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">新人品爆发值</el-col>
						<el-input v-model="newstrikeluckyValue" placeholder="请输入"></el-input>
						<el-button type="primary" @click="newstrikeluckyValue1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newstrikereturnProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="strikeLuckyedit = false">取消</el-button>
					   <el-button type="primary" @click="newstrikeluckyValueSubmit()">提交</el-button>
					</span>
			</el-dialog>
			<el-form style="display: flex;justify-content: space-around;width:235px;float: right;">
				<el-form-item>
					<!-- 人品爆发概率编辑 -->
					<el-button type="primary" @click="strikeLuckyHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='人品爆发概率'
				  :visible.sync="strikeLucky"
				  :close-on-click-model="false">
					<el-table :data="dataList3">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="probability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability"  placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">人品爆发值</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.strikeluckyValue}}</el-col>
						</div>
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.strikereturnProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newstrikereturnProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.new1strikereturnProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="strikeLucky = false">取消</el-button>
					   <el-button type="primary" @click="strikeLuckySubmit()">提交</el-button>
					</span>
				</el-dialog>
			</el-form>
		</template>
		</div>
	</div>
	
</template>

<script>
export default{
	inject:['reload'],
	data(){
		return{
			gsingleLimit:'110.15432',//黄金蛋(幸运)单抽限制
			gtenLimit:'',//黄金蛋(幸运)十抽限制
			ghundredLimit:'',//黄金蛋(幸运)百抽限制
		//---------------------------------------
			gsingleVisible:false,
			gtenVisible:false,
			ghundredVisible:false,
			dsingleVisible:false,
			dtenVisible:false,
			dhundredVisible:false,
			type:1,
			dataList1:[],  //黄金蛋列表
			dataList2:[],  //钻石蛋列表
			dataList3:[],  //人品爆发列表
			pageIndex: 1,
			pageSize: 10,
			dataListLoading: false,
			// -------------------------
			returnGProbability:'',
			returnGtenProbability:'',
			returnGhunderProbability:'',
			newreturnGProbability:'',
			newreturnGtenProbability:'',
			newreturnGhunderProbability:'',
			// ---------------------------------
			returnDProbability:'',
			returnDtenProbability:'',
			returnDhunderProbability:'',
			newreturnDProbability:'',
			newreturnDtenProbability:'',
			newreturnDhunderProbability:'',
			// ======================================
			//人品爆发值表
			strikereturnDhunderProbability:'',  //人品爆发表-钻石百连抽回报率
			strikeLucky:false,
			strikeLuckyedit:false,
			strikeluckyValue:'',//人品爆发值
			newstrikeluckyValue:'',//新人品爆发值
			strikereturnProbability:'',//人品爆发值的回报率
			newstrikereturnProbability:0,//人品爆发值的新回报率
			new1strikereturnProbability:'',
			strikesum:'',//人品爆发的价格乘以概率的和

		}
	},
    activated () {
      this.getDataList1()
    },
	methods: {
		// 黄金蛋数据
      getDataList1(){
		this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizedraw/queryPrizeList'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,          
			'prizeType':0
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList1= data.data
			this.gsingleLimit=data.ONE_PRIZE_PROBABILIRY
			this.gtenLimit=data.TEN_PRIZE_PROBABILIRY
			this.ghundredLimit=data.HUNDRED_PRIZE_PROBABILIRY
            // this.totalPage = data.data.total
          } else {
            // this.dataList = []
            // this.totalPage = 0
          }
		  this.dataListLoading = false
		  // console.log(this.dataList1.length)
		  // =========================================================
		  //黄金蛋单抽回报率sumTotal1
		  //黄金蛋十抽回报率sumTotal2
		  //黄金蛋百抽回报率sumTotal3
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var a2=0
			var a3=0
			for(let i=0;i<array.length;i++){
				a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].probability)
				a2 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].tenProbability)
				a3 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].hunderProbability)
			}
			var sumTotal1=((a1/20)*100).toFixed(5)
			var sumTotal2=((a2/20)*100).toFixed(5)
			var sumTotal3=((a3/20)*100).toFixed(5)
			this.returnGProbability=sumTotal1
			this.returnGtenProbability=sumTotal2
			this.returnGhunderProbability=sumTotal3
			if(sumTotal1>90){
				document.getElementById("p1").style.background = "red";
				document.getElementById("p1").style.color = "#fff";
			}else if(sumTotal1>85 && sumTotal1<=90){
				document.getElementById("p1").style.background = "orange";
				document.getElementById("p1").style.color = "#fff";
			}
			else if(sumTotal1>80 && sumTotal1<=85){
				document.getElementById("p1").style.background = "yellow";
				document.getElementById("p1").style.color = "#000000";
			}else if(sumTotal1>75 && sumTotal1<=80){
				document.getElementById("p1").style.background = "lightgreen";
				document.getElementById("p1").style.color = "#fff";
			}
			else if(sumTotal1>65&& sumTotal1<=75){
				document.getElementById("p1").style.background = "darkgreen";
				document.getElementById("p1").style.color = "#fff";
			}
			else if(sumTotal1>=0 && sumTotal1<=65){
				document.getElementById("p1").style.background = "blue";
				document.getElementById("p1").style.color = "#fff";
			}
			// =========================================================
			if(sumTotal2>90){
				document.getElementById("p2").style.background = "red";
				document.getElementById("p2").style.color = "#fff";
			}else if(sumTotal2>85 && sumTotal2<=90){
				document.getElementById("p2").style.background = "orange";
				document.getElementById("p2").style.color = "#fff";
			}
			else if(sumTotal2>80 && sumTotal2<=85){
				document.getElementById("p2").style.background = "yellow";
				document.getElementById("p2").style.color = "#000";
			}else if(sumTotal2>75 && sumTotal2<=80){
				document.getElementById("p2").style.background = "lightgreen";
				document.getElementById("p2").style.color = "#fff";
			}
			else if(sumTotal2>65&& sumTotal2<=75){
				document.getElementById("p2").style.background = "darkgreen";
				document.getElementById("p2").style.color = "#fff";
			}
			else if(sumTotal2>=0 && sumTotal2<=65){
				document.getElementById("p2").style.background = "blue";
				document.getElementById("p2").style.color = "#fff";
			}
		// =========================================================
		//黄金蛋百连抽回报率
			if(sumTotal3>90){
				document.getElementById("p3").style.background = "red";
				document.getElementById("p3").style.color = "#fff";
			}else if(sumTotal3>85 && sumTotal3<=90){
				document.getElementById("p3").style.background = "orange";
				document.getElementById("p3").style.color = "#fff";
			}
			else if(sumTotal3>80 && sumTotal3<=85){
				document.getElementById("p3").style.background = "yellow";
				document.getElementById("p3").style.color = "#000";
			}else if(sumTotal3>75 && sumTotal3<=80){
				document.getElementById("p3").style.background = "lightgreen";
				document.getElementById("p3").style.color = "#fff";
			}
			else if(sumTotal3>65&& sumTotal3<=75){
				document.getElementById("p3").style.background = "darkgreen";
				document.getElementById("p3").style.color = "#fff";
			}
			else if(sumTotal3>=0 && sumTotal3<=65){
				document.getElementById("p3").style.background = "blue";
				document.getElementById("p3").style.color = "#fff";
			}
        })

      },
	  // 钻石蛋数据
      getDataList2(){
		this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizedraw/queryPrizeList'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,          
			'prizeType':1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList2= data.data
            // this.totalPage = data.data.total
          } else {
            // this.dataList = []
            // this.totalPage = 0
          }
		  this.dataListLoading=false
		  var array=this.dataList2
		  // console.log(array)
		  var a1=0
		  var a2=0
		  var a3=0
		  for(let i=0;i<array.length;i++){
		  	a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].probability)
		  	a2 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].tenProbability)
		  	a3 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].hunderProbability)
		  }
		  var sumTotal4=((a1/200)*100).toFixed(5)
		  var sumTotal5=((a2/200)*100).toFixed(5)
		  var sumTotal6=((a3/200)*100).toFixed(5)
		  this.returnDProbability=sumTotal4
		  this.returnDtenProbability=sumTotal5
		  this.returnDhunderProbability=sumTotal6
		  // =========================================================
		  //钻石蛋单抽回报率
			if(sumTotal4>90){
				document.getElementById("p4").style.background = "red";
				document.getElementById("p4").style.color = "#fff";
			}else if(sumTotal4>85 && sumTotal4<=90){
				document.getElementById("p4").style.background = "orange";
				document.getElementById("p4").style.color = "#fff";
			}
			else if(sumTotal4>80 && sumTotal4<=85){
				document.getElementById("p4").style.background = "yellow";
				document.getElementById("p4").style.color = "#000";
			}else if(sumTotal4>75 && sumTotal4<=80){
				document.getElementById("p4").style.background = "lightgreen";
				document.getElementById("p4").style.color = "#fff";
			}
			else if(sumTotal4>65&& sumTotal4<=75){
				document.getElementById("p4").style.background = "darkgreen";
				document.getElementById("p4").style.color = "#fff";
			}
			else if(sumTotal4>=0 && sumTotal4<=65){
				document.getElementById("p4").style.background = "blue";
				document.getElementById("p4").style.color = "#fff";
			}	
		// =========================================================
		//钻石蛋十连抽回报率
			if(sumTotal5>90){
				document.getElementById("p5").style.background = "red";
				document.getElementById("p5").style.color = "#fff";
			}else if(sumTotal5>85 && sumTotal5<=90){
				document.getElementById("p5").style.background = "orange";
				document.getElementById("p5").style.color = "#fff";
			}
			else if(sumTotal5>80 && sumTotal5<=85){
				document.getElementById("p5").style.background = "yellow";
				document.getElementById("p5").style.color = "#000";
			}else if(sumTotal5>75 && sumTotal5<=80){
				document.getElementById("p5").style.background = "lightgreen";
				document.getElementById("p5").style.color = "#fff";
			}
			else if(sumTotal5>65&& sumTotal5<=75){
				document.getElementById("p5").style.background = "darkgreen";
				document.getElementById("p5").style.color = "#fff";
			}
			else if(sumTotal5>=0 && sumTotal5<=65){
				document.getElementById("p5").style.background = "blue";
				document.getElementById("p5").style.color = "#fff";
			}
		// =========================================================
		//钻石蛋百连抽回报率
			if(sumTotal6>90){
				document.getElementById("p6").style.background = "red";
				document.getElementById("p6").style.color = "#fff";
			}else if(sumTotal6>85 && sumTotal6<=90){
				document.getElementById("p6").style.background = "orange";
				document.getElementById("p6").style.color = "#fff";
			}
			else if(sumTotal6>80 && sumTotal6<=85){
				document.getElementById("p6").style.background = "yellow";
				document.getElementById("p6").style.color = "#000";
			}else if(sumTotal6>75 && sumTotal6<=80){
				document.getElementById("p6").style.background = "lightgreen";
				document.getElementById("p6").style.color = "#fff";
			}
			else if(sumTotal6>65&& sumTotal6<=75){
				document.getElementById("p6").style.background = "darkgreen";
				document.getElementById("p6").style.color = "#fff";
			}
			else if(sumTotal6>=0 && sumTotal6<=65){
				document.getElementById("p6").style.background = "blue";
				document.getElementById("p6").style.color = "#fff";
			}
        })
      },
		// 黄金蛋单抽
		gsingleHandle(){
			// console.log('黄金蛋单抽')
			 this.gsingleVisible= true
			 this.$nextTick(() => {
				 this.getDataList1()
			 })
		},
		// 黄金蛋单抽新回报率
		newreturnGProbability1(){
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList1.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList1[s].newProbability=Number(y)
			var r=x*y
			var newreturnGProbability=(((a1+r)/20)*100).toFixed(5)
			this.newreturnGProbability=newreturnGProbability
		},
		// 黄金蛋单抽提交
		gsingleVisibleSubmit(){
			console.log(this.newreturnGProbability)
			console.log(this.gsingleLimit)
			var gsingleLimit=parseFloat(this.gsingleLimit)
			var newreturnGProbabilityL=parseFloat(this.newreturnGProbability)
			if(newreturnGProbabilityL>gsingleLimit){
				console.log('新回报率大于限制')
				  this.$message({
					message: '新回报率大于限制',
					type: 'error',
					duration:1000,
					onClose: () => {
					  // this.gsingleVisible = false
					  // this.reload();
					  // this.$emit('refreshDataList')
					}
				  })
			}else{
				console.log('新回报率小于限制')
				//头等奖
				 var array1=this.dataList1
				 var i=0
				 var sum=0
				 for(let i=0;i<array1.length;i++){
					if(i==0){
						array1[0].leftProbability=0
						array1[0].rightProbability=parseFloat(array1[0].newProbability)			
					}else{
						array1[i].leftProbability=(parseFloat(array1[i-1].rightProbability)).toFixed(5)
						array1[i].rightProbability=(parseFloat(array1[i].newProbability)+parseFloat(array1[i].leftProbability)).toFixed(5)
						sum += parseFloat(array1[i-1].newProbability)
					}
					if(i==(array1.length-1)){
						array1[array1.length-1].leftProbability=array1[(array1.length-1)-1].rightProbability
						array1[array1.length-1].rightProbability=1
					}
				 }
				this.dataList1=array1
				 // console.log(this.dataList1)
				 this.dataList1[((this.dataList1).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)
				
				  this.$http({
					url: this.$http.adornUrl('/sys/maskprizedraw/updatePrizeProbability'),
					method: 'post',
					data: this.$http.adornData({
					  'dataList1':this.dataList1,
					  'prizeType':0,
					  'prizeNumber':1,
					})
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message: '保存修改',
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.gsingleVisible = false
						  this.reload();
						  this.$emit('refreshDataList')
						}
					  })
					} else {
					  this.$message.error(data.msg)
					}
				  })
			}

	  },
		// 黄金蛋十抽
		gtenHandle(){
			// console.log('黄金蛋十抽')
			 this.gtenVisible= true
			 this.$nextTick(() => {
				 
			 })
		},
		//黄金蛋十抽新回报率
		newreturnGtenProbability1(){
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList1.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList1[s].newProbability=Number(y)
			var r=x*y
			var newreturnGtenProbability=(((a1+r)/20)*100).toFixed(5)
			this.newreturnGtenProbability=newreturnGtenProbability	
		},
		//黄金蛋十连抽提交
		gtenVisibleSubmit(){
			var gtenLimit=parseFloat(this.gtenLimit)
			var newreturnGtenProbability=parseFloat(this.newreturnGtenProbability)
			if(newreturnGtenProbability>gtenLimit){
				console.log('新回报率大于限制')
				  this.$message({
					message: '新回报率大于限制',
					type: 'error',
					duration:1000,
					onClose: () => {
					  // this.gsingleVisible = false
					  // this.reload();
					  // this.$emit('refreshDataList')
					}
				  })
			}else{
				var array1=this.dataList1
				 var i=0
				 var sum=0
				 for(let i=0;i<array1.length;i++){
					if(i==0){
						array1[0].leftProbability=0
						array1[0].rightProbability=parseFloat(array1[0].newProbability)			
					}else{
						array1[i].leftProbability=(parseFloat(array1[i-1].rightProbability)).toFixed(5)
						array1[i].rightProbability=(parseFloat(array1[i].newProbability)+parseFloat(array1[i].leftProbability)).toFixed(5)
						sum += parseFloat(array1[i-1].newProbability)
					}
					if(i==(array1.length-1)){
						array1[array1.length-1].leftProbability=array1[(array1.length-1)-1].rightProbability
						array1[array1.length-1].rightProbability=1
					}
				 }
				this.dataList1=array1
				 // console.log(this.dataList1)
				 this.dataList1[((this.dataList1).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)
				
				  this.$http({
					url: this.$http.adornUrl('/sys/maskprizedraw/updatePrizeProbability'),
					method: 'post',
					data: this.$http.adornData({
					  'dataList1':this.dataList1,
					  'prizeType':0,
					  'prizeNumber':10,
					})
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message: '保存修改',
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.gsingleVisible = false
						  this.reload();
						  this.$emit('refreshDataList')
						}
					  })
					} else {
					  this.$message.error(data.msg)
					}
				  })
			}
			// console.log('黄金蛋十抽提交')

		},
		// 黄金蛋百抽
		ghundredHandle(){
			// console.log('黄金蛋百抽')
			 this.ghundredVisible= true
			 this.$nextTick(() => {
				 
			 })
		},
		//黄金蛋百抽新回报率
		newreturnGhunderProbability1(){
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList1.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList1[s].newProbability=Number(y)
			var r=x*y
			var newreturnGhunderProbability=(((a1+r)/20)*100).toFixed(5)
			this.newreturnGhunderProbability=newreturnGhunderProbability
		},
		//黄金蛋百连抽提交
		ghundredVisibleSubmit(){
			// console.log('黄金蛋百抽提交')
			var ghundredLimit=parseFloat(this.ghundredLimit)
			var newreturnGhunderProbability=parseFloat(this.newreturnGhunderProbability)
			if(newreturnGhunderProbability>ghundredLimit){
				console.log('新回报率大于限制')
				  this.$message({
					message: '新回报率大于限制',
					type: 'error',
					duration:1000,
					onClose: () => {
					  // this.gsingleVisible = false
					  // this.reload();
					  // this.$emit('refreshDataList')
					}
				  })
			}else{
				var array1=this.dataList1
				 var i=0
				 var sum=0
				 for(let i=0;i<array1.length;i++){
					if(i==0){
						array1[0].leftProbability=0
						array1[0].rightProbability=parseFloat(array1[0].newProbability)			
					}else{
						array1[i].leftProbability=(parseFloat(array1[i-1].rightProbability)).toFixed(5)
						array1[i].rightProbability=(parseFloat(array1[i].newProbability)+parseFloat(array1[i].leftProbability)).toFixed(5)
						sum += parseFloat(array1[i-1].newProbability)
					}
					if(i==(array1.length-1)){
						array1[array1.length-1].leftProbability=array1[(array1.length-1)-1].rightProbability
						array1[array1.length-1].rightProbability=1
					}
				 }
				this.dataList1=array1
				 // console.log(this.dataList1)
				 this.dataList1[((this.dataList1).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)
				
				  this.$http({
					url: this.$http.adornUrl('/sys/maskprizedraw/updatePrizeProbability'),
					method: 'post',
					data: this.$http.adornData({
					  'dataList1':this.dataList1,
					  'prizeType':0,
					  'prizeNumber':100,
					})
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message: '保存修改',
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.gsingleVisible = false
						  this.reload();
						  this.$emit('refreshDataList')
						}
					  })
					} else {
					  this.$message.error(data.msg)
					}
				  })
			}
			 
		},
// --------------------------------------------------------------------------
	// 钻石
		// 钻石单抽编辑
		dsingleHandle(){
			// console.log('钻石蛋单抽')
			 this.dsingleVisible= true
			 this.$nextTick(() => {
			 })
		},
		// 钻石单抽新回报率
		newreturnDProbability1(){
			// console.log('钻石单抽新回报率')
			var array=this.dataList2
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList2.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList2[s].newProbability=Number(y)
			var r=x*y
			var newreturnDProbability=(((a1+r)/200)*100).toFixed(5)
			this.newreturnDProbability=newreturnDProbability
		},
		// 钻石单抽提交
		dsingleVisibleSubmit(){
			// console.log('钻石单抽提交')
			 var array2=this.dataList2
			 var i=0
			 var sum=0
			 for(let i=0;i<array2.length;i++){
				if(i==0){
					array2[0].leftProbability=0
					array2[0].rightProbability=parseFloat(array2[0].newProbability)			
				}else{
					array2[i].leftProbability=(parseFloat(array2[i-1].rightProbability)).toFixed(5)
					array2[i].rightProbability=(parseFloat(array2[i].newProbability)+parseFloat(array2[i].leftProbability)).toFixed(5)
					sum += parseFloat(array2[i-1].newProbability)
				}
				if(i==(array2.length-1)){
					array2[array2.length-1].leftProbability=array2[(array2.length-1)-1].rightProbability
					array2[array2.length-1].rightProbability=1
				}
			 }
			this.dataList2=array2
			 // console.log(this.dataList2)
			 this.dataList2[((this.dataList2).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)

			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedraw/updatePrizeProbability'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList2,
				  'prizeType':1,
				  'prizeNumber':1,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.dsingleVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
			
		},
		// 钻石十连抽编辑
		dtenHandle(){
			// console.log('钻石蛋十抽')
			 this.dtenVisible= true
			 this.$nextTick(() => {
				 
			 })
		},
		// 钻石十连抽新回报率
		newreturnDtenProbability1(){
			// console.log('钻石十连抽新回报率')
			var array=this.dataList2
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList2.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList2[s].newProbability=Number(y)
			var r=x*y
			var newreturnDtenProbability=(((a1+r)/200)*100).toFixed(5)
			this.newreturnDtenProbability=newreturnDtenProbability
		},
		//钻石十连抽提交
		dtenVisibleSubmit(){
			// console.log('钻石十连抽提交')
		 var array2=this.dataList2
		 var i=0
		 var sum=0
		 for(let i=0;i<array2.length;i++){
			if(i==0){
				array2[0].leftProbability=0
				array2[0].rightProbability=parseFloat(array2[0].newProbability)			
			}else{
				array2[i].leftProbability=(parseFloat(array2[i-1].rightProbability)).toFixed(5)
				array2[i].rightProbability=(parseFloat(array2[i].newProbability)+parseFloat(array2[i].leftProbability)).toFixed(5)
				sum += parseFloat(array2[i-1].newProbability)
			}
			if(i==(array2.length-1)){
				array2[array2.length-1].leftProbability=array2[(array2.length-1)-1].rightProbability
				array2[array2.length-1].rightProbability=1
			}
		 }
		this.dataList2=array2
		 // console.log(this.dataList2)
		 this.dataList2[((this.dataList2).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)

			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedraw/updatePrizeProbability'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList2,
				  'prizeType':1,
				  'prizeNumber':10,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.dtenVisible= false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
		},
		// 钻石百连抽编辑
		dhundredHandle(){
			// console.log('钻石蛋百抽')
			 this.dhundredVisible= true
			 this.$nextTick(() => {
				 
			 })
		},
		//钻石百连抽新回报率
		newreturnDhunderProbability1(){
			// console.log('钻石百连抽新回报率')
			var array=this.dataList2
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList2.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList2[s].newProbability=Number(y)
			var r=x*y
			var newreturnDhunderProbability=(((a1+r)/200)*100).toFixed(5)
			this.newreturnDhunderProbability=newreturnDhunderProbability
		},
		//钻石百连抽提交
		dhundredVisibleSubmit(){
			// console.log('钻石百连抽提交')
		 var array2=this.dataList2
		 var i=0
		 var sum=0
		 for(let i=0;i<array2.length;i++){
			if(i==0){
				array2[0].leftProbability=0
				array2[0].rightProbability=parseFloat(array2[0].newProbability)			
			}else{
				array2[i].leftProbability=(parseFloat(array2[i-1].rightProbability)).toFixed(5)
				array2[i].rightProbability=(parseFloat(array2[i].newProbability)+parseFloat(array2[i].leftProbability)).toFixed(5)
				sum += parseFloat(array2[i-1].newProbability)
			}
			if(i==(array2.length-1)){
				array2[array2.length-1].leftProbability=array2[(array2.length-1)-1].rightProbability
				array2[array2.length-1].rightProbability=1
			}
		 }
		this.dataList2=array2
		 // console.log(this.dataList2)
		 this.dataList2[((this.dataList2).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)
			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedraw/updatePrizeProbability'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList2,
				  'prizeType':1,
				  'prizeNumber':100,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.dhundredVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
		},
	// ===============================================================
	// 人品爆发
		// 获取数据
	getdd(){
//----//请求钻石蛋的接口，计算钻石蛋百连抽的回报率----------------//
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizedraw/queryPrizeList'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,          
			'prizeType':1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList2= data.data
          } else {}
		//钻石蛋百连抽回报率
		  var array=this.dataList2
		  // console.log(array)
		  var a3=0
		  for(let i=0;i<array.length;i++){
		  	a3 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].hunderProbability)
		  }
		  var sumTotal6=((a3/200)*100).toFixed(5)
		  this.strikereturnDhunderProbability=sumTotal6	  
		  // console.log(this.strikereturnDhunderProbability+'=============钻石百连抽')
		})
	},
	 getDataList3(){
		 this.dataListLoading=true
//==================================================
        this.$http({
          url: this.$http.adornUrl('/sys/masksuperprize/querySuperPrize'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,          
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList3=data.data.data
			this.strikeluckyValue=data.data.RPValue
            // this.totalPage = data.data.total
          } else{}
		  this.dataListLoading=false
		  // console.log('人品爆发表的回报率')
		  // 人品爆发表的回报率 prizeDiamond*probability
		  var array=this.dataList3
		  // console.log(array)
		  var sum=0
		  for(let i=0;i<array.length;i++){
		  	sum +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].probability)
		  }
		   var strikereturnDhunderProbability=this.strikereturnDhunderProbability
		   var t1=(strikereturnDhunderProbability)/100
		   var strikeluckyValue=(this.strikeluckyValue)*2
		   this.strikesum=sum
		   var tt=1-t1
		   var total=((sum)/(strikeluckyValue*tt)*100).toFixed(5)
		   this.strikereturnProbability=total
		 //   console.log(strikereturnDhunderProbability+"=="+t1+"========="+tt+"=============="+total+"----------"+sum+'======='+strikeluckyValue+'qqq'+strikereturnDhunderProbability)
			// console.log(t1)
		})
	 },
	 //人品爆发值编辑
	 strikeLuckyEdit(){
		// console.log('人品爆发值编辑')
		this.strikeLuckyedit=true
		this.$nextTick(() => {
		 				 
		 })
	 },
	 //人品爆发值编辑时校验新回报率
	 newstrikeluckyValue1(){
		 // console.log('人品爆发值编辑时校验新回报率')
		 // console.log(this.newstrikeluckyValue)
		 // console.log(this.strikereturnDhunderProbability)
		 // console.log(this.strikesum)
		 var strikereturnDhunderProbability=(this.strikereturnDhunderProbability)/100
		 var newstrikeluckyValue=(this.newstrikeluckyValue)*2
		 var newstrikereturnProbability=(((this.strikesum)/((newstrikeluckyValue)*(1-strikereturnDhunderProbability)))*100).toFixed(5)
		 this.newstrikereturnProbability=newstrikereturnProbability
		 // console.log(newstrikereturnProbability)
	 },
	 //新人品爆发值提交
	 newstrikeluckyValueSubmit(){
		 // console.log('新人品爆发值提交')
			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedraw/updateRPNumber'),
				method: 'post',
				data: this.$http.adornData({
				  'rPNumber':this.newstrikeluckyValue,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.dhundredVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
	 },
	 // 人品爆发概率编辑
	 strikeLuckyHandle(){
			// console.log('人品爆发概率编辑')
			 this.strikeLucky= true
			 this.$nextTick(() => {
				 
			 })
	 },
	 //人品爆发概率新回报率
	 newstrikereturnProbability1(){
		 // console.log('编辑新概率的新回报率校验')
			var array=this.dataList3
			console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList3.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList3[s].newProbability=Number(y)
			var r=x*y
			var totalsum=Number(a1+r)
			var strikeluckyValue=(this.strikeluckyValue)*2
			var strikereturnDhunderProbability=1-((this.strikereturnDhunderProbability)/100)
		  // console.log(strikereturnDhunderProbability)
		 var new1strikereturnProbability=(((totalsum)/((strikeluckyValue)*(strikereturnDhunderProbability)))*100).toFixed(5)
		 this.new1strikereturnProbability=new1strikereturnProbability
	 },
	 //人品爆发概率提交
	 strikeLuckySubmit(){
		 // console.log('人品爆发概率提交')
		 //特等奖
		 var array3=this.dataList3
		 var i=0
		 var sum=0
		 for(let i=0;i<array3.length;i++){
			if(i==0){
				array3[0].leftProbability=0
				array3[0].rightProbability=parseFloat(array3[0].newProbability)
				// console.log(array3[0].rightProbability)
				// console.log(array3[0].newProbability)				
			}else{
				array3[i].leftProbability=(parseFloat(array3[i-1].rightProbability)).toFixed(5)
				array3[i].rightProbability=(parseFloat(array3[i].newProbability)+parseFloat(array3[i].leftProbability)).toFixed(5)
				sum += parseFloat(array3[i-1].newProbability)
			}
			if(i==(array3.length-1)){
				array3[array3.length-1].leftProbability=array3[(array3.length-1)-1].rightProbability
				array3[array3.length-1].rightProbability=1
			}
		 }
		this.dataList3=array3
		 // console.log(array3[0].newProbability)
		 // console.log(sum)
		 // console.log(this.dataList3)
		 this.dataList3[((this.dataList3).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)

			  this.$http({
				url: this.$http.adornUrl('/sys/masksuperprize/querySuperPrize'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList3,
				  'prizeType':3,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.dhundredVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
	 },

	},
}
</script>

<style>
</style>
