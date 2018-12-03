
$(() => {
    $(".change-status").on("click"), (e) =>{
        var id = $(this).data("id");
        var newEaten = $(this).data("");

        var newEatenState = {
            eaten: newEaten,
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(
            () => {
                console.log("Change Eaten to", newEaten);
                location.reload();
            }
        )
    };

    $(".create-form").on("submit", (e) => {
        event.preventDefault();

        var newBurger = {
            name: $("#bu").val().trim(),
            eaten: $("[name=eaten]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            () => {
                console.log("New Burger Crafted");
                location.reload();
            }
        )
    });

    $(".delete-burger").on("click", (e) => {
        var id = $(this).data("id");

        $.ajax("api/burgers", {
            type: "DELETE",
        }).then(
            () => {
                console.log("Deleted Burger", id);
                location.reload();
            }
        )
    });
});
