<?php
//show error msg
function sem($errors, $fld)
{
	if ($errors->has($fld))
	{
		return "<span class='error_msg'>".$errors->first($fld)."</span>";
	}
}
