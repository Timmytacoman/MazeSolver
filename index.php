<html>

<head>
    <title>Run my Python files</title>
    <?php
    $output = shell_exec('py --version');
    echo "<pre>$output</pre>";
    ?>
</head>