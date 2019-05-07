/**
 * 通用分页组件
 * Hukai
 */
<template>
  	<div class="block">
    	<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pagerData.pageNo"
	      :page-sizes="pageSizes"
	      :page-size="pagerData.pageSize"
		  background
		  layout="total, prev, pager, next, jumper"
	      :total="pagerData.pageTotal">
    	</el-pagination>
  	</div>
</template>

<script>
  	export default {
  		data() {
	  		return {
	  			pageSizes: [10]
	  		}
	  	},
	  	props: ["pagerData"],
	  	methods: {
	      handleSizeChange(pageSize) {
	      	this.$emit('onSearch', 1, pageSize);
	      },
	      handleCurrentChange(pageNo) {
	      	this.$emit('onSearch', pageNo, this.pagerData.pageSize);
	      }
	   	}
  	}
</script>

<style lang="scss">
.el-pagination {
		text-align: right;
		padding: 20px;
		&.is-background .el-pager li:not(.disabled).active{
			background-color: #29b751;
			color: #fff !important;
		}
		&.is-background .el-pager li:not(.disabled):hover{
			color: #29b751;
		}
	} 
</style>