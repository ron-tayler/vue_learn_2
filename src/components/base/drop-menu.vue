<template>
	<div class="drop-container">
		<div class="drop-btn" @click.stop="toggle">
			<slot name="button"></slot>
		</div>
		<div class="drop-menu"
			:class="side"
			v-if="is_open">
			<slot name="menu"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'drop-menu',
		props:{
			side:{
				type:String,
				default:()=>'down'
			}
		},
		data:()=>({
			is_open:false
		}),
		methods:{
			toggle(){
				this.is_open=!this.is_open;
			},
			open(){
				this.is_open=true;
			},
			close(){
				this.is_open=false;
			}
		},
		mounted(){
			window.addEventListener('click',this.close)
		},
		destroyed(){
			window.removeEventListener('click',this.close)
		}
	}
</script>

<style scoped>
	.drop-container{
		position: relative;
	}
	.drop-menu{
		position: absolute;
		z-index: 100;
		padding: 5px;
		border-radius: 5px;
		background: #ffffff;
		box-shadow: var(--shadow-base);
		display: flex;
		flex-direction: column;
	}
	.drop-menu.down{
		top: 100%;
		left: 50%;
		transform: translateY(5px) translateX(-50%);
	}
	.drop-menu *{
		white-space: nowrap;
		text-align: left;
	}
</style>